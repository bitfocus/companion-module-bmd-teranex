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
		{ id: 'SDI', label: 'SDI (2D, 3D, Express)' },
		{ id: 'SDI1', label: 'SDI 1 (AV)' },
		{ id: 'SDI2', label: 'SDI 2 (AV)' },
		{ id: 'HDMI', label: 'HDMI (2D, 3D, AV)' },
		{ id: 'Composite', label: 'Composite (2D, 3D)' },
		{ id: 'Component', label: 'Component (2D, 3D)' },
		{ id: 'Optical', label: 'Optical (Express, AV)' }
	];

	self.audio_sources = [
		{ id: 'Embedded', label: 'Embedded (2D, 3D, Express, AV)' },
		{ id: 'AES', label: 'AES (2D, 3D, AV)' },
		{ id: 'RCA', label: 'RCA (2D, 3D, AV)' },
		{ id: 'DB25', label: 'DB25 (2D, 3D, AV))' }
	];

	// Teranex AV and Teranex Express
	// 	self.avex_output_formats = [
		self.output_format = [
		{ id: '525i59.94 NTSC', label: '525i 59.94hz NTSC' },
		{ id: '625i50 PAL', label: '625i 50hz PAL' },
		{ id: '720p50', label: '720p 50hz' },
		{ id: '720p59.94', label: '720p 59.94hz' },
		{ id: '720p60', label: '720p 60hz' },
		{ id: '1080p23.98', label: '1080p 23.98hz' },
		{ id: '1080PsF23.98', label: '1080PsF 23.98hz' },
		{ id: '1080p24', label: '1080p 24hz' },
		{ id: '1080PsF24', label: '1080PsF 24hz' },
		{ id: '1080p25', label: '1080p 25hz' },
		{ id: '1080PsF25', label: '1080PsF 25hz' },
		{ id: '1080p29.97', label: '1080p 29.97hz' },
		{ id: '1080PsF29.97', label: '1080PsF 29.97hz' },
		{ id: '1080p30', label: '1080p 30hz' },
		{ id: '1080PsF30', label: '1080PsF 30hz' },
		{ id: '1080i50', label: '1080i 50hz' },
		{ id: '1080p50', label: '1080p 50hz' },
		{ id: '1080i59.94', label: '1080i 59.94hz' },
		{ id: '1080p59.94', label: '1080p 59.94hz' },
		{ id: '1080i60', label: '1080i 50hz' },
		{ id: '1080p60', label: '1080p 50hz' },
		{ id: '1080p59.94', label: '1080p 59.94hz' },
		{ id: '2K DCI 23.98p', label: '2K DCI 23.98hz' },
		{ id: '2K DCI 23.98PsF', label: '2K DCI PsF 23.98hz' },
		{ id: '2K DCI 24p', label: '2K DCI 24hz' },
		{ id: '2K DCI 24PsF', label: '2K DCI PsF 24hz' },
		{ id: '2160p23.98', label: '2160p 23.98hz (AV/Express)' },
		{ id: '2160p24', label: '2160p 24hz (AV/Express)' },
		{ id: '2160p25', label: '2160p 25hz (AV/Express)' },
		{ id: '2160p29.97', label: '2160p 29.97hz (AV/Express)' },
		{ id: '2160p30', label: '2160p 30hz (AV/Express)' },
		{ id: '2160p50', label: '2160p 50hz (AV/Express)' },
		{ id: '2160p59.94', label: '2160p 59.94hz (AV/Express)' },
		{ id: '2160p60', label: '2160p 60hz (AV/Express)' }
	];
		
	// Select Terenex preset
	self.preset_sources = [
		{ id: '1', label: 'Preset 1' },
		{ id: '2', label: 'Preset 2' },
		{ id: '3', label: 'Preset 3' },
		{ id: '4', label: 'Preset 4' },
		{ id: '5', label: 'Preset 5' },
		{ id: '6', label: 'Preset 6' }
	];
	
	// Select Terenex Test Pattern
	self.testPattern = [
		{ id: 'None', label: 'Off' },
		{ id: 'SMPTEBars', label: 'SMPTE 75%' },
		{ id: 'Bars', label: 'Colorbar 75%' },
		{ id: 'Black', label: 'Black' },
		{ id: 'Grid', label: 'Grid' },
		{ id: 'Multiburst', label: 'Res Chart' }
	];
	
	// Select option for when there is no signal
	self.noSignal = [
		{id: 'Black', label: 'Black' },
		{id: 'Bars', label: 'Colorbars' }
	];
	
	// Select test tone for test pattern
	self.testTone = [
		{ id: 'None', label: 'None' },
		{ id: 'Tone750Hz', label: 'Tone .75KHz' },
		{ id: 'Tone1500Hz', label: 'Tone 1.5KHz' },
		{ id: 'Tone3KHz', label: 'Tone 3KHz' },
		{ id: 'Tone6KHz', label: 'Tone 6KHz' }
	];
	
	
	// Motion ON or OFF for Test Pattern
	self.testPatternMotion = [
		{ id: 'true', label: 'On' },
		{ id: 'false', label: 'Off' }
	];
	
	//Horizontal rate for test pattern
	self.horizontalRate = [
		{ id: '-3', label: '-3'},
		{ id: '-2', label: '-2'},
		{ id: '-1', label: '-1'},
		{ id: '0', label: '0'},
		{ id: '1', label: '1'},
		{ id: '2', label: '2'},
		{ id: '3', label: '3'}
	];
	
	// Select Output Display
	self.outputDisplay = [
		{ id: 'Input', label: 'Input' },
		{ id: 'Black', label: 'Black' },
		{ id: 'Still', label: 'Still' },
		{ id: 'Freeze', label: 'Freeze'}
	];
	
	// Zoom Crop option
	self.zoomCrop = [
		{ id: 'true', label: 'On' },
		{ id: 'false', label: 'Off' }
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
	
	if (key == 'VIDEO OUTPUT') {
		debug("VIDEO OUTPUT DATA: ", data);
		
		if (data['Video mode'] !== undefined) {
			self.output_format = data['Video mode'];
			self.setVariable('output_format', self.output_format);
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
	variables.push({
		label: 'Selected video output',
		name: 'output_format'
	});
	self.setVariable('input_format', self.input_format);
	self.setVariable('video_input', self.video_source);
	self.setVariable('audio_input', self.audio_source);
	self.setVariable('output_formats', self.output_formats);

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
				default: 'SDI1',
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

	self.setActions({

		'set_input': {
			label: 'Set video input',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'SDI1',
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
		},
		'recall_preset': {
			label: 'Recall preset',
			options: [
				{
					type: 'dropdown',
					label: 'Preset',
					id: 'source',
					default: '1',
					choices: self.preset_sources
				}
			]
		},
		'test_pattern': {
			label: 'Test pattern',
			options: [
				{
					type: 'dropdown',
					label: 'Test Pattern',
					id: 'testPattern',
					default: 'None',
					choices: self.testPattern
				},
				{
					type: 'dropdown',
					label: 'No Signal',
					id: 'noSignal',
					default: 'Black',
					choices: self.noSignal
				},
				{
					type: 'dropdown',
					label: 'Test Tone',
					id: 'testTone',
					default: 'None',
					choices: self.testTone
				},
				{
					type: 'dropdown',
					label: 'Motion',
					id: 'testPatternMotion',
					default: 'false',
					choices: self.testPatternMotion
				},
				{
					type: 'dropdown',
					label: 'Horizontal rate',
					id: 'horizontalRate',
					default: '0',
					choices: self.horizontalRate
				}
			]
		},
		'output_display': {
			label: 'Output display',
			options: [
				{
					type: 'dropdown',
					label: 'Output display',
					id: 'outputDisplay',
					default: 'Input',
					choices: self.outputDisplay
				},
				{
					type: 'number',
					label: 'Transition Settings',
					id: 'transitionSetting',
					default: 0,
					min: 0,
					max: 50,
					required: false,
					tooltip: 'Enter 0 to 50. Example: 1.5 seconds, enter 15. Example: 5 seconds, enter 50. No decimals.'
				}
			]
		},
		'output_format': {
			label: 'Output format',
			options: [
				{
					type: 'dropdown',
					label: 'Output Format',
					id: 'outputFormats',
					default: '1080i5994',
					choices: self.output_format
				}
			]
		},
		
		'variable_aspect_ratio': {
			label: 'Variable aspect ratio',
			options: [
				{
					type: 'number',
					label: 'Horizontal Size',
					id: 'horizontalSize',
					default: 0,
					min: -9999,
					max: 9999,
					required: false,
					tooltip: 'Maximum/Minimum range is half minus one of the horizontal size.',
				},
				{
					type: 'number',
					label: 'Vertical Size',
					id: 'verticalSize',
					default: 0,
					min: -9999,
					max: 9999,
					required: false,
					tooltip: 'Maximum/Minimum range is half minus one of the vertical size.',
				},
				{
					type: 'number',
					label: 'Horizontal Position',
					id: 'horizontalPosition',
					default: 0,
					min: -9999,
					max: 9999,
					required: false,
					tooltip: ' Maximum/Minimum range is half minus one of the horizontal size.',
				},
				{
					type: 'number',
					label: 'Vertical Position',
					id: 'verticalPosition',
					default: 0,
					min: -9999,
					max: 9999,
					required: false,
					tooltip: ' Maximum/Minimum range is half minus one of the vertical size.',
				},
				
				{
					type: 'number',
					label: 'Horizontal Trim',
					id: 'horizontalTrim',
					default: 0,
					min: 0,
					max: 9999,
					required: false,
					tooltip: ' Maximum range is half minus one of the horizontal size.',
				},
				{
					type: 'number',
					label: 'Vertical Trim',
					id: 'verticalTrim',
					default: 0,
					min: 0,
					max: 9999,
					required: false,
					tooltip: ' Maximum range is half minus one of the vertical size.',
				},
				{
					type: 'dropdown',
					label: 'Zoom/Crop',
					id: 'zoomCrop',
					default: 'false',
					choices: self.zoomCrop
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
	else if (action.action === 'recall_preset') {
		cmd = "PRESET:\nRecall:" + action.options.source + "\n\n";
	}
	else if (action.action === 'test_pattern') {
		cmd = "TEST PATTERN:\nOutput:" + action.options.testPattern + "\nNo Signal:" + action.options.noSignal + "\nTest Tone:" + action.options.testTone + "\nMotion:" + action.options.testPatternMotion + "\nHorizontal rate:" + action.options.horizontalRate + "\n\n";
	}
	else if (action.action === 'output_display') {
		cmd = "VIDEO OUTPUT:\nOutput option:" + action.options.outputDisplay + "\n" + "Transition setting:" + action.options.transitionSetting + "\n\n";
	}	
	else if (action.action === 'output_format') {
		cmd = "VIDEO OUTPUT:\nVideo mode:" + action.options.outputFormats + "\n\n";
	}
 	else if (action.action === 'variable_aspect_ratio') {
	 	cmd = "VARIABLE ASPECT RATIO:" + "\n" +
	 	"Variable Aspect Ratio size X left:" + action.options.horizontalSize + "\n" +
 	 	"Variable Aspect Ratio size Y left:" + action.options.verticalSize + "\n" +
 	 	"Variable Aspect Ratio pos X left:" + action.options.horizontalPosition + "\n" +
 	 	"Variable Aspect Ratio pos Y left:" + action.options.verticalPosition + "\n" +
 	 	"Variable Aspect Ratio trim X left:" + action.options.horizontalTrim + "\n" +
 	 	"Variable Aspect Ratio trim Y left:" + action.options.verticalTrim + "\n" +
 	 	"Variable Aspect Ratio zoom/crop:" + action.options.zoomCrop + "\n\n";
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
