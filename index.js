// BlackMagic Design Teranex 

var tcp = require('../../tcp');
var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
	var self = this;

	// Request id counter
	self.request_id = 0;
	self.stash = [];
	self.command = null;

	self.video_sources = [
		{ id: 'SDI', label: 'SDI' },
		{ id: 'HDMI', label: 'HDMI' },
		{ id: 'Composite', label: 'Composite' },
		{ id: 'Component', label: 'Component' },
		{ id: 'Optical', label: 'Optical' }
	];

	self.audio_sources = [
		{ id: 'Embedded', label: 'Embedded' },
		{ id: 'AES', label: 'AES' },
		{ id: 'RCA', label: 'RCA' },
		{ id: 'DB25', label: 'DB25 (Analog)' }
	];

	// super-constructor
	instance_skel.apply(this, arguments);

	self.actions(); // export actions

	return self;
}

instance.prototype.teranexInformation = function(key,data) {
	var self = this;
	var changed = false;
	var oldHasData = self.has_data = true;

	if (key == 'VIDEO INPUT') {
		debug("VIDEO INPUT DATA: ", data);

		if (data['Video source'] !== undefined) {
			self.video_source = data['Video source'];
			self.setVariable('video_input', self.video_source);
			self.checkFeedbacks('input_bg');
			self.has_data = true;
		}

		if (data['Audio source'] !== undefined) {
			self.audio_source = data['Audio source'];
			self.setVariable('audio_input', self.audio_source);
			self.checkFeedbacks('audio_bg');
			self.has_data = true;
		}

		if (data['Video mode'] !== undefined) {
			self.input_format = data['Video mode'];
			self.setVariable('input_format', self.input_format);
		}

		if (data['Signal present'] !== undefined) {
			self.signal_present = data['Signal present'];
			self.checkFeedbacks('signal_present');
			self.has_data = true;
		}
	}

	// Initial data from teranex
	if (oldHasData != self.has_data && self.has_data) {
		self.checkFeedbacks();
		self.update_variables();
	}

};

instance.prototype.updateConfig = function(config) {
	var self = this;

	self.config = config;
	self.init_tcp();
};

instance.prototype.init = function() {
	var self = this;

	debug = self.debug;
	log = self.log;

	self.init_tcp();

	self.update_variables(); // export variables
	self.init_presets();
};

instance.prototype.init_tcp = function() {
	var self = this;
	var receivebuffer = '';

	if (self.socket !== undefined) {
		self.socket.destroy();
		delete self.socket;
	}

	if (self.config.port === undefined) {
		self.config.port = 9800;
	}

	self.has_data = false;

	if (self.config.host) {
		self.socket = new tcp(self.config.host, self.config.port);

		self.socket.on('status_change', function (status, message) {
			self.status(status, message);
		});

		self.socket.on('error', function (err) {
			debug("Network error", err);
			self.log('error',"Network error: " + err.message);
		});

		self.socket.on('connect', function () {
			debug("Connected");
		});

		// separate buffered stream into lines with responses
		self.socket.on('data', function (chunk) {
			var i = 0, line = '', offset = 0;
			receivebuffer += chunk;
			while ( (i = receivebuffer.indexOf('\n', offset)) !== -1) {
				line = receivebuffer.substr(offset, i - offset);
				offset = i + 1;
				self.socket.emit('receiveline', line.toString());
			}
			receivebuffer = receivebuffer.substr(offset);
		});

		self.socket.on('receiveline', function (line) {

			if (self.command === null && line.match(/:/) ) {
				self.command = line;
			}

			else if (self.command !== null && line.length > 0) {
				self.stash.push(line.trim());
			}

			else if (line.length === 0 && self.command !== null) {
				var cmd = self.command.trim().split(/:/)[0];

				debug("COMMAND:", cmd);

				var obj = {};
				self.stash.forEach(function (val) {
					var info = val.split(/\s*:\s*/);
					obj[info.shift()] = info.join(":");
				});

				self.teranexInformation(cmd, obj);

				self.stash = [];
				self.command = null;
			}

			else {
				debug("weird response from teranex", line, line.length);
			}

		});

	}
};

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;

	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module will connect to any Blackmagic Design Teranex Device.'
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Device IP',
			width: 6,
			default: '192.168.0.1',
			regex: self.REGEX_IP
		}
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
	}

	debug("destroy", self.id);;
};

instance.prototype.update_variables = function (system) {
	var self = this;
	var variables = [];

	variables.push({
		label: 'Input video format',
		name: 'input_format'
	});
	variables.push({
		label: 'Selected video input',
		name: 'video_input'
	});
	variables.push({
		label: 'Selected audio input',
		name: 'audio_input'
	});
	self.setVariable('input_format', self.input_format);
	self.setVariable('video_input', self.video_source);
	self.setVariable('audio_input', self.audio_source);

	self.setVariableDefinitions(variables);

	// feedbacks
	var feedbacks = {};

	feedbacks['input_bg'] = {
		label: 'Video input: Change background color',
		description: 'If the input specified is the active video input, change colors of the bank',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg',
				default: self.rgb(255,255,255)
			},
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg',
				default: self.rgb(255,0,0)
			},
			{
				type: 'dropdown',
				label: 'Input',
				id: 'input',
				default: 'SDI',
				choices: self.video_sources
			}
		]
	};

	feedbacks['audio_bg'] = {
		label: 'Audio input: Change background color',
		description: 'If the input specified is the active audio input, change colors of the bank',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg',
				default: self.rgb(255,255,255)
			},
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg',
				default: self.rgb(255,0,0)
			},
			{
				type: 'dropdown',
				label: 'Input',
				id: 'input',
				default: 'Embedded',
				choices: self.audio_sources
			}
		]
	};

	feedbacks['signal_present'] = {
		label: 'Signal is present',
		description: 'Change colors of bank if the signal is present',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg',
				default: self.rgb(255,255,255)
			},
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg',
				default: self.rgb(0,255,0)
			}
		]
	};


	self.setFeedbackDefinitions(feedbacks);
};

instance.prototype.feedback = function(feedback, bank) {
	var self = this;

	if (feedback.type == 'input_bg') {
		if (self.video_source === feedback.options.input) {
			return {
				color: feedback.options.fg,
				bgcolor: feedback.options.bg
			};
		}
	}
	else if (feedback.type == 'audio_bg') {
		if (self.audio_source === feedback.options.input) {
			return {
				color: feedback.options.fg,
				bgcolor: feedback.options.bg
			};
		}
	}
	else if (feedback.type == 'signal_present') {
		if (self.signal_present === 'true') {
			return {
				color: feedback.options.fg,
				bgcolor: feedback.options.bg
			};
		}
	}
};

instance.prototype.init_presets = function () {
	var self = this;
	var presets = [];

	// Video
	for (var i = 0; i < self.video_sources.length; ++i) {
		var input = self.video_sources[i].id;
		presets.push({
			category: 'Video',
			label: 'Change video input to ' + input,
			bank: {
				style: 'text',
				text: input,
				size: 'auto',
				color: '16777215',
				bgcolor: 0
			},
			feedbacks: [
				{
					type: 'input_bg',
					options: {
						bg: self.rgb(255,0,0),
						fg: self.rgb(255,255,255),
						input: input
					}
				}
			],
			actions: [
				{
					action: 'set_input',
					options: {
						source: input
					}
				}
			]
		});
	}

	// Audio
	for (var i = 0; i < self.audio_sources.length; ++i) {
		var input = self.audio_sources[i].id;
		presets.push({
			category: 'Audio',
			label: 'Change audio input to ' + input,
			bank: {
				style: 'text',
				text: input,
				size: 'auto',
				color: '16777215',
				bgcolor: 0
			},
			feedbacks: [
				{
					type: 'audio_bg',
					options: {
						bg: self.rgb(255,0,0),
						fg: self.rgb(255,255,255),
						input: input
					}
				}
			],
			actions: [
				{
					action: 'set_audio',
					options: {
						source: input
					}
				}
			]
		});
	}

	// Signal present
	presets.push({
		category: 'Status',
		label: 'Show signal status',
		bank: {
			style: 'text',
			text: '$(teranex:input_format)',
			size: 'auto',
			color: '16777215',
			bgcolor: self.rgb(255, 0, 0)
		},
		feedbacks: [
			{
				type: 'signal_present',
				options: {
					bg: self.rgb(0, 255, 0),
					fg: self.rgb(255, 255, 255)
				}
			}
		]
	});

	self.setPresetDefinitions(presets);
};

instance.prototype.actions = function() {
	var self = this;

	self.system.emit('instance_actions', self.id, {

		'set_input': {
			label: 'Set video input',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'SDI',
					choices: self.video_sources
				}
			]
		},

		'set_audio': {
			label: 'Set audio input',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'Embedded',
					choices: self.audio_sources
				}
			]
		}

	});
}

instance.prototype.action = function(action) {

	var self = this;
	var cmd;

	if (action.action === 'set_input') {
		cmd = "VIDEO INPUT:\nVideo source:" + action.options.source + "\n\n";
	}
	else if (action.action === 'set_audio') {
		cmd = "VIDEO INPUT:\nAudio source: " + action.options.source + "\n\n";
	}

	if (cmd !== undefined) {
		if (self.socket !== undefined && self.socket.connected) {
			self.socket.send(cmd);
		} else {
			debug('Socket not connected :(');
		}

	}
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
