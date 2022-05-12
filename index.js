// BlackMagic Design Teranex

var tcp = require('../../tcp');
var instance_skel = require('../../instance_skel');
var debug;
var log;

instance.prototype.data = {
	video_adjust: {
		red: 0,
		green: 0,
		blue: 0,
		luma_low: 4,
		luma_high: 1019,
		chroma_low: 4,
		chroma_high: 1019,
		aspect_fill_luma: 64,
		aspect_fill_cb: 512,
		aspect_fill_cr: 512
	},
	video_procamp: {
		gain: 0,
		black: 0,
		saturation: 0,
		hue: 0,
		ry: 0,
		by: 0,
		sharp: 0
	}
};

function instance(system, id, config) {
	let self = this;

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
		{ id: '1080i60', label: '1080i 60hz' },
		{ id: '1080p60', label: '1080p 60hz' },
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
		
	// Select Teranex preset
	self.preset_sources = [
		{ id: '1', label: 'Preset 1' },
		{ id: '2', label: 'Preset 2' },
		{ id: '3', label: 'Preset 3' },
		{ id: '4', label: 'Preset 4' },
		{ id: '5', label: 'Preset 5' },
		{ id: '6', label: 'Preset 6' }
	];
	
	// Select Teranex Test Pattern
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
	let self = this;
	let changed = false;
	let oldHasData = self.has_data = true;

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

	if (key == 'VIDEO ADJUST') {
		debug("VIDEO ADJUST DATA: ", data);

		if (data['Red'] !== undefined) {
			self.data.video_adjust.red = parseInt(data['Red']);
			self.setVariable('video_adjust_red', self.data.video_adjust.red);
		}

		if (data['Green'] !== undefined) {
			self.data.video_adjust.green = parseInt(data['Green']);
			self.setVariable('video_adjust_green', self.data.video_adjust.green);
		}

		if (data['Blue'] !== undefined) {
			self.data.video_adjust.blue = parseInt(data['Blue']);
			self.setVariable('video_adjust_blue', self.data.video_adjust.blue);
		}

		if (data['Luma low'] !== undefined) {
			self.data.video_adjust.luma_low = parseInt(data['Luma low']);
			self.setVariable('video_adjust_luma_low', self.data.video_adjust.luma_low);
		}

		if (data['Luma high'] !== undefined) {
			self.data.video_adjust.luma_high = parseInt(data['Luma high']);
			self.setVariable('video_adjust_luma_high', self.data.video_adjust.luma_high);
		}

		if (data['Chroma low'] !== undefined) {
			self.data.video_adjust.chroma_low = parseInt(data['Chroma low']);
			self.setVariable('video_adjust_chroma_low', self.data.video_adjust.chroma_low);
		}

		if (data['Chroma high'] !== undefined) {
			self.data.video_adjust.chroma_high = parseInt(data['Chroma high']);
			self.setVariable('video_adjust_chroma_high', self.data.video_adjust.chroma_high);
		}

		if (data['Aspect fill luma'] !== undefined) {
			self.data.video_adjust.aspect_fill_luma = parseInt(data['Aspect fill luma']);
			self.setVariable('video_adjust_aspect_fill_luma', self.data.video_adjust.aspect_fill_luma);
		}

		if (data['Aspect fill Cb'] !== undefined) {
			self.data.video_adjust.aspect_fill_cb = parseInt(data['Aspect fill Cb']);
			self.setVariable('video_adjust_aspect_fill_cb', self.data.video_adjust.aspect_fill_cb);
		}

		if (data['Aspect fill Cr'] !== undefined) {
			self.data.video_adjust.aspect_fill_cr = parseInt(data['Aspect fill Cr']);
			self.setVariable('video_adjust_aspect_fill_cr', self.data.video_adjust.aspect_fill_cr);
		}
	}

	if (key == 'VIDEO PROC AMP') {
		debug("VIDEO PROC AMP DATA: ", data);

		if (data['Gain'] !== undefined) {
			self.data.video_procamp.gain = parseInt(data['Gain']);
			self.setVariable('video_procamp_gain', self.data.video_procamp.gain);
		}

		if (data['Black'] !== undefined) {
			self.data.video_procamp.black = parseInt(data['Black']);
			self.setVariable('video_procamp_black', self.data.video_procamp.black);
		}

		if (data['Saturation'] !== undefined) {
			self.data.video_procamp.saturation = parseInt(data['Saturation']);
			self.setVariable('video_procamp_saturation', self.data.video_procamp.saturation);
		}

		if (data['Hue'] !== undefined) {
			self.data.video_procamp.hue = parseInt(data['Hue']);
			self.setVariable('video_procamp_hue', self.data.video_procamp.hue);
		}

		if (data['RY'] !== undefined) {
			self.data.video_procamp.ry = parseInt(data['RY']);
			self.setVariable('video_procamp_ry', self.data.video_procamp.ry);
		}

		if (data['BY'] !== undefined) {
			self.data.video_procamp.by = parseInt(data['BY']);
			self.setVariable('video_procamp_by', self.data.video_procamp.by);
		}

		if (data['Sharp'] !== undefined) {
			self.data.video_procamp.sharp = parseInt(data['Sharp']);
			self.setVariable('video_procamp_sharp', self.data.video_procamp.sharp);
		}
	}

	// Initial data from teranex
	if (oldHasData != self.has_data && self.has_data) {
		self.checkFeedbacks();
		self.update_variables();
	}

};

instance.prototype.updateConfig = function(config) {
	let self = this;

	self.config = config;
	self.init_tcp();
};

instance.prototype.init = function() {
	let self = this;

	debug = self.debug;
	log = self.log;

	self.init_tcp();

	self.update_variables(); // export variables
	self.init_presets();
};

instance.prototype.init_tcp = function() {
	let self = this;
	let receivebuffer = '';

	if (self.socket !== undefined) {
		self.setVariable('connect_status', 'Disconnected');
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
			self.socket.destroy();
			delete self.socket;
			self.setVariable('connect_status', 'Disconnected');
			self.log('info', 'Retrying connection in 10 seconds...');
			setTimeout(self.init_tcp.bind(self), 10000); //retry after 10 seconds
		});

		self.socket.on('connect', function () {
			debug("Connected");
			self.setVariable('connect_status', 'Connected');
		});

		// separate buffered stream into lines with responses
		self.socket.on('data', function (chunk) {
			let i = 0, line = '', offset = 0;
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
				let cmd = self.command.trim().split(/:/)[0];

				debug("COMMAND:", cmd);

				let obj = {};
				self.stash.forEach(function (val) {
					let info = val.split(/\s*:\s*/);
					obj[info.shift()] = info.join(":");
				});

				self.teranexInformation(cmd, obj);

				self.stash = [];
				self.command = null;
			}
			else {
				debug("Unexpected response from Teranex:", line, line.length);
			}
		});
	}
};

// Return config fields for web config
instance.prototype.config_fields = function () {
	let self = this;

	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module will connect to a Blackmagic Design Teranex Device.'
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
	let self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
	}

	debug("destroy", self.id);;
};

instance.prototype.update_variables = function (system) {
	let self = this;
	let variables = [];

	variables.push({
		label: 'Connection Status',
		name: 'connect_status'
	});

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

	variables.push({
		label: 'Video Adjust Red',
		name: 'video_adjust_red'
	});

	variables.push({
		label: 'Video Adjust Green',
		name: 'video_adjust_green'
	});

	variables.push({
		label: 'Video Adjust Blue',
		name: 'video_adjust_blue'
	});

	variables.push({
		label: 'Video Adjust Luma Low',
		name: 'video_adjust_luma_low'
	});

	variables.push({
		label: 'Video Adjust Luma High',
		name: 'video_adjust_luma_high'
	});

	variables.push({
		label: 'Video Adjust Chroma Low',
		name: 'video_adjust_chroma_low'
	});

	variables.push({
		label: 'Video Adjust Chroma High',
		name: 'video_adjust_chroma_high'
	});

	variables.push({
		label: 'Video Adjust Aspect Fill Luma',
		name: 'video_adjust_aspect_fill_luma'
	});

	variables.push({
		label: 'Video Adjust Aspect Fill Cb',
		name: 'video_adjust_aspect_fill_cb'
	});

	variables.push({
		label: 'Video Adjust Aspect Fill Cr',
		name: 'video_adjust_aspect_fill_cr'
	});

	variables.push({
		label: 'Video Proc Amp Gain',
		name: 'video_procamp_gain'
	});

	variables.push({
		label: 'Video Proc Amp Black',
		name: 'video_procamp_black'
	});

	variables.push({
		label: 'Video Proc Amp Saturation',
		name: 'video_procamp_saturation'
	});

	variables.push({
		label: 'Video Proc Amp Hue',
		name: 'video_procamp_hue'
	});

	variables.push({
		label: 'Video Proc Amp RY',
		name: 'video_procamp_ry'
	});

	variables.push({
		label: 'Video Proc Amp BY',
		name: 'video_procamp_by'
	});

	variables.push({
		label: 'Video Proc Amp Sharp',
		name: 'video_procamp_sharp'
	});

	self.setVariable('connect_status', 'Disconnected');

	self.setVariable('input_format', self.input_format);
	self.setVariable('video_input', self.video_source);
	self.setVariable('audio_input', self.audio_source);
	self.setVariable('output_formats', self.output_formats);

	self.setVariable('video_adjust_red', self.data.video_adjust.red);
	self.setVariable('video_adjust_green', self.data.video_adjust.green);
	self.setVariable('video_adjust_blue', self.data.video_adjust.blue);
	self.setVariable('video_adjust_luma_low', self.data.video_adjust.luma_low);
	self.setVariable('video_adjust_luma_high', self.data.video_adjust.luma_high);
	self.setVariable('video_adjust_chroma_low', self.data.video_adjust.chroma_low);
	self.setVariable('video_adjust_chroma_high', self.data.video_adjust.chroma_high);
	self.setVariable('video_adjust_aspect_fill_luma', self.data.video_adjust.aspect_fill_luma);
	self.setVariable('video_adjust_aspect_fill_cb', self.data.video_adjust.aspect_fill_cb);
	self.setVariable('video_adjust_aspect_fill_cr', self.data.video_adjust.aspect_fill_cr);

	self.setVariable('video_procamp_gain', self.data.video_procamp.gain);
	self.setVariable('video_procamp_black', self.data.video_procamp.black);
	self.setVariable('video_procamp_saturation', self.data.video_procamp.saturation);
	self.setVariable('video_procamp_hue', self.data.video_procamp.hue);
	self.setVariable('video_procamp_ry', self.data.video_procamp.ry);
	self.setVariable('video_procamp_by', self.data.video_procamp.by);
	self.setVariable('video_procamp_sharp', self.data.video_procamp.sharp);


	self.setVariableDefinitions(variables);

	// feedbacks
	let feedbacks = {};

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
	let self = this;

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
	let self = this;
	let presets = [];

	// Video
	for (let i = 0; i < self.video_sources.length; ++i) {
		let input = self.video_sources[i].id;
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
	for (let i = 0; i < self.audio_sources.length; ++i) {
		let input = self.audio_sources[i].id;
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
	let self = this;

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
			],
			callback: function(action, bank) {
				cmd = "VIDEO INPUT:\nVideo source:" + action.options.source + "\n\n";
				self.sendCommand(cmd);
			}
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
			],
			callback: function(action, bank) {
				cmd = "VIDEO INPUT:\nAudio source: " + action.options.source + "\n\n";
				self.sendCommand(cmd);
			}
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
			],
			callback: function(action, bank) {
				cmd = "PRESET:\nRecall:" + action.options.source + "\n\n";
				self.sendCommand(cmd);
			}
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
			],
			callback: function(action, bank) {
				cmd = "TEST PATTERN:\nOutput:" + action.options.testPattern + "\nNo Signal:" + action.options.noSignal + "\nTest Tone:" + action.options.testTone + "\nMotion:" + action.options.testPatternMotion + "\nHorizontal rate:" + action.options.horizontalRate + "\n\n";
				self.sendCommand(cmd);
			}
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
			],
			callback: function(action, bank) {
				cmd = "VIDEO OUTPUT:\nOutput option:" + action.options.outputDisplay + "\n" + "Transition setting:" + action.options.transitionSetting + "\n\n";
				self.sendCommand(cmd);
			}
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
			],
			callback: function(action, bank) {
				cmd = "VIDEO OUTPUT:\nVideo mode:" + action.options.outputFormats + "\n\n";
				self.sendCommand(cmd);
			}
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
			],
			callback: function(action, bank) {
				cmd = "VARIABLE ASPECT RATIO:" + "\n" +
				"Variable Aspect Ratio size X left:" + action.options.horizontalSize + "\n" +
				"Variable Aspect Ratio size Y left:" + action.options.verticalSize + "\n" +
				"Variable Aspect Ratio pos X left:" + action.options.horizontalPosition + "\n" +
				"Variable Aspect Ratio pos Y left:" + action.options.verticalPosition + "\n" +
				"Variable Aspect Ratio trim X left:" + action.options.horizontalTrim + "\n" +
				"Variable Aspect Ratio trim Y left:" + action.options.verticalTrim + "\n" +
				"Variable Aspect Ratio zoom/crop:" + action.options.zoomCrop + "\n\n";
				self.sendCommand(cmd);
			}
		},

		'videoadjust_red': {
			label: 'Set Video Adjust Red Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < -200) {
					value = -200;
				}
				else if (value > 200) {
					value = 200;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Red Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO ADJUST:\nRed:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_red_increase': {
			label: 'Increase Video Adjust Red Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.red;

				value++;
				
				if (value > 200) {
					value = 200;
				}

				let cmd = "VIDEO ADJUST:\nRed:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_red_decrease': {
			label: 'Decrease Video Adjust Red Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.red;

				value--;
				
				if (value < -200) {
					value = -200;
				}

				let cmd = "VIDEO ADJUST:\nRed:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},

		'videoadjust_green': {
			label: 'Set Video Adjust Green Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < -200) {
					value = -200;
				}
				else if (value > 200) {
					value = 200;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Green Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO ADJUST:\nGreen:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_green_increase': {
			label: 'Increase Video Adjust Green Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.green;

				value++;
				
				if (value > 200) {
					value = 200;
				}

				let cmd = "VIDEO ADJUST:\nGreen:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_green_decrease': {
			label: 'Decrease Video Adjust Green Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.green;

				value--;
				
				if (value < -200) {
					value = -200;
				}

				let cmd = "VIDEO ADJUST:\nGreen:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},

		'videoadjust_blue': {
			label: 'Set Video Adjust Blue Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < -200) {
					value = -200;
				}
				else if (value > 200) {
					value = 200;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Blue Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO ADJUST:\nBlue:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_blue_increase': {
			label: 'Increase Video Adjust Blue Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.blue;

				value++;
				
				if (value > 200) {
					value = 200;
				}

				let cmd = "VIDEO ADJUST:\nBlue:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_blue_decrease': {
			label: 'Decrease Video Adjust Blue Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.blue;

				value--;
				
				if (value < -200) {
					value = -200;
				}

				let cmd = "VIDEO ADJUST:\nBlue:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_lumalow': {
			label: 'Set Video Adjust Luma Low Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '4',
					tooltip: 'Value between 4 - 1018'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < 4) {
					value = 4;
				}
				else if (value > 1018) {
					value = 1018;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Luma Low Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO ADJUST:\nLuma low:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_lumalow_increase': {
			label: 'Increase Video Adjust Luma Low Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.luma_low;

				value++;
				
				if (value > 1018) {
					value = 1018;
				}

				let cmd = "VIDEO ADJUST:\nLuma low:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_lumalow_decrease': {
			label: 'Decrease Video Adjust Luma Low Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.luma_low;

				value--;
				
				if (value < 4) {
					value = 4;
				}

				let cmd = "VIDEO ADJUST:\nLuma low:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_lumahigh': {
			label: 'Set Video Adjust Luma High Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '1019',
					tooltip: 'Value between 5 - 1019'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < 4) {
					value = 4;
				}
				else if (value > 1019) {
					value = 1019;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Luma High Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO ADJUST:\nLuma high:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_lumahigh_increase': {
			label: 'Increase Video Adjust Luma High Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.luma_high;

				value++;
				
				if (value > 1019) {
					value = 1019;
				}

				let cmd = "VIDEO ADJUST:\nLuma high:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_lumahigh_decrease': {
			label: 'Decrease Video Adjust Luma High Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.luma_high;

				value--;
				
				if (value < 5) {
					value = 5;
				}

				let cmd = "VIDEO ADJUST:\nLuma high:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_chromalow': {
			label: 'Set Video Adjust Chroma Low Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '4',
					tooltip: 'Value between 4 - 1018'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < 4) {
					value = 4;
				}
				else if (value > 1018) {
					value = 1018;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Chroma Low Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO ADJUST:\nChroma low:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_chromalow_increase': {
			label: 'Increase Video Adjust Chroma Low Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.chroma_low;

				value++;
				
				if (value > 1018) {
					value = 1018;
				}

				let cmd = "VIDEO ADJUST:\nChroma low:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_chromalow_decrease': {
			label: 'Decrease Video Adjust Chroma Low Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.chroma_low;

				value--;
				
				if (value < 4) {
					value = 4;
				}

				let cmd = "VIDEO ADJUST:\nChroma low:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_chromahigh': {
			label: 'Set Video Adjust Chroma High Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '1019',
					tooltip: 'Value between 5 - 1019'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < 4) {
					value = 4;
				}
				else if (value > 1019) {
					value = 1019;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Chroma High Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO ADJUST:\nChroma high:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_chromahigh_increase': {
			label: 'Increase Video Adjust Chroma High Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.chroma_high;

				value++;
				
				if (value > 1019) {
					value = 1019;
				}

				let cmd = "VIDEO ADJUST:\nChroma high:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_chromahigh_decrease': {
			label: 'Decrease Video Adjust Chroma High Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.chroma_high;

				value--;
				
				if (value < 5) {
					value = 5;
				}

				let cmd = "VIDEO ADJUST:\nChroma high:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_aspect_fill_luma': {
			label: 'Set Video Adjust Aspect Fill Lima Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '64',
					tooltip: 'Value between 64 - 940'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < 64) {
					value = 64;
				}
				else if (value > 940) {
					value = 940;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Aspect Fill Luma Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO ADJUST:\nAspect fill luma:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_aspect_fill_luma_increase': {
			label: 'Increase Video Adjust Aspect Fill Luma Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.aspect_fill_luma;

				value++;
				
				if (value > 940) {
					value = 940;
				}

				let cmd = "VIDEO ADJUST:\nAspect fill luma:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_aspect_fill_luma_decrease': {
			label: 'Decrease Video Adjust Aspect Fill Luma Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.aspect_fill_luma;

				value--;
				
				if (value < 64) {
					value = 64;
				}

				let cmd = "VIDEO ADJUST:\nAspect fill luma:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_aspect_fill_cb': {
			label: 'Set Video Adjust Aspect Fill Cb Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '512',
					tooltip: 'Value between 64 - 960'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < 64) {
					value = 64;
				}
				else if (value > 960) {
					value = 960;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Aspect Fill Cb Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO ADJUST:\nAspect fill Cb:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_aspect_fill_cb_increase': {
			label: 'Increase Video Adjust Aspect Fill Cb Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.aspect_fill_cb;

				value++;
				
				if (value > 960) {
					value = 960;
				}

				let cmd = "VIDEO ADJUST:\nAspect fill Cb:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_aspect_fill_cb_decrease': {
			label: 'Decrease Video Adjust Aspect Fill Cb Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.aspect_fill_cb;

				value--;
				
				if (value < 64) {
					value = 64;
				}

				let cmd = "VIDEO ADJUST:\nAspect fill Cb:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_aspect_fill_cr': {
			label: 'Set Video Adjust Aspect Fill Cr Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '512',
					tooltip: 'Value between 64 - 960'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < 64) {
					value = 64;
				}
				else if (value > 960) {
					value = 960;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Aspect Fill Cr Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO ADJUST:\nAspect fill Cr:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_aspect_fill_cr_increase': {
			label: 'Increase Video Adjust Aspect Fill Cr Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.aspect_fill_cr;

				value++;
				
				if (value > 960) {
					value = 960;
				}

				let cmd = "VIDEO ADJUST:\nAspect fill Cr:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoadjust_aspect_fill_cr_decrease': {
			label: 'Decrease Video Adjust Aspect Fill Cr Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_adjust.aspect_fill_cr;

				value--;
				
				if (value < 64) {
					value = 64;
				}

				let cmd = "VIDEO ADJUST:\nAspect fill Cr:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},

		'videoprocamp_gain': {
			label: 'Set Video Proc Amp Gain Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -60 to +60'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < -60) {
					value = -60;
				}
				else if (value > 60) {
					value = 60;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp Gain Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO PROC AMP:\nGain:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_gain_increase': {
			label: 'Increase Video Proc Amp Gain Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.gain;

				value++;
				
				if (value > 60) {
					value = 60;
				}

				let cmd = "VIDEO PROC AMP:\nGain:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_gain_decrease': {
			label: 'Decrease Video Proc Amp Gain Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.gain;

				value--;
				
				if (value < -60) {
					value = 60;
				}

				let cmd = "VIDEO PROC AMP:\nGain:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_black': {
			label: 'Set Video Proc Amp Black Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -30 to +30'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < -30) {
					value = -30;
				}
				else if (value > 30) {
					value = 30;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp Black Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO PROC AMP:\nBlack:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_black_increase': {
			label: 'Increase Video Proc Amp Black Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.black;

				value++;
				
				if (value > 30) {
					value = 30;
				}

				let cmd = "VIDEO PROC AMP:\nBlack:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_black_decrease': {
			label: 'Decrease Video Proc Amp Black Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.black;

				value--;
				
				if (value < -30) {
					value = 30;
				}

				let cmd = "VIDEO PROC AMP:\nBlack:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_saturation': {
			label: 'Set Video Proc Saturation Gain Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -60 to +60'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < -60) {
					value = -60;
				}
				else if (value > 60) {
					value = 60;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp Saturation Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO PROC AMP:\nSaturation:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_saturation_increase': {
			label: 'Increase Video Proc Amp Saturation Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.saturation;

				value++;
				
				if (value > 60) {
					value = 60;
				}

				let cmd = "VIDEO PROC AMP:\nSaturation:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_saturation_decrease': {
			label: 'Decrease Video Proc Amp Saturation Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.saturation;

				value--;
				
				if (value < -60) {
					value = 60;
				}

				let cmd = "VIDEO PROC AMP:\nSaturation:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_hue': {
			label: 'Set Video Proc Amp Hue Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -179 to +180'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < -179) {
					value = -179;
				}
				else if (value > 180) {
					value = 180;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp Hue Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO PROC AMP:\nHue:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_hue_increase': {
			label: 'Increase Video Proc Amp Hue Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.hue;

				value++;
				
				if (value > 180) {
					value = 180;
				}

				let cmd = "VIDEO PROC AMP:\nHue:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_hue_decrease': {
			label: 'Decrease Video Proc Amp Hue Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.hue;

				value--;
				
				if (value < -179) {
					value = 179;
				}

				let cmd = "VIDEO PROC AMP:\nHue:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_ry': {
			label: 'Set Video Proc Amp RY Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < -200) {
					value = -200;
				}
				else if (value > 200) {
					value = 200;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp RY Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO PROC AMP:\nRY:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_ry_increase': {
			label: 'Increase Video Proc Amp RY Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.ry;

				value++;
				
				if (value > 200) {
					value = 200;
				}

				let cmd = "VIDEO PROC AMP:\nRY:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_ry_decrease': {
			label: 'Decrease Video Proc Amp RY Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.ry;

				value--;
				
				if (value < -200) {
					value = 200;
				}

				let cmd = "VIDEO PROC AMP:\nRY:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_by': {
			label: 'Set Video Proc Amp BY Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < -200) {
					value = -200;
				}
				else if (value > 200) {
					value = 200;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp BY Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO PROC AMP:\nBY:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_by_increase': {
			label: 'Increase Video Proc Amp BY Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.by;

				value++;
				
				if (value > 200) {
					value = 200;
				}

				let cmd = "VIDEO PROC AMP:\nBY:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_by_decrease': {
			label: 'Decrease Video Proc Amp BY Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.by;

				value--;
				
				if (value < -200) {
					value = 200;
				}

				let cmd = "VIDEO PROC AMP:\nBY:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_sharp': {
			label: 'Set Video Proc Amp Sharp Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -50 to +50'
				}
			],
			callback: function(action, bank) {
				let value = parseInt(action.options.value);
				if (value < -50) {
					value = -50;
				}
				else if (value > 50) {
					value = 50;
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp Sharp Value is not valid: ' + action.options.value);
					return;
				}

				let cmd = "VIDEO PROC AMP:\nSharp:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_sharp_increase': {
			label: 'Increase Video Proc Amp Sharp Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.sharp;

				value++;
				
				if (value > 50) {
					value = 50;
				}

				let cmd = "VIDEO PROC AMP:\nSharp:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
		'videoprocamp_sharp_decrease': {
			label: 'Decrease Video Proc Amp Sharp Value by 1',
			callback: function(action, bank) {
				let value = self.data.video_procamp.sharp;

				value--;
				
				if (value < -50) {
					value = 50;
				}

				let cmd = "VIDEO PROC AMP:\nSharp:" + value + "\n\n";
				self.sendCommand(cmd);
			}
		},
	});
}

instance.prototype.sendCommand = function(cmd) {
	let self = this;

	if (self.socket !== undefined && self.socket.connected) {
		self.socket.send(cmd);
	} else {
		debug('Socket not connected :(');
	}
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
