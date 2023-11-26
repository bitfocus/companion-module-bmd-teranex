module.exports = {
	initActions: function () {
		let self = this
		let actions = {}

		actions.set_input = {
			name: 'Set video input',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'SDI1',
					choices: self.video_sources,
				},
			],
			callback: function (action, bank) {
				cmd = 'VIDEO INPUT:\nVideo source:' + action.options.source + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.set_audio = {
			name: 'Set audio input',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'Embedded',
					choices: self.audio_sources,
				},
			],
			callback: function (action, bank) {
				cmd = 'VIDEO INPUT:\nAudio source: ' + action.options.source + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.recall_preset = {
			name: 'Recall preset',
			options: [
				{
					type: 'dropdown',
					label: 'Preset',
					id: 'source',
					default: '1',
					choices: self.preset_sources,
				},
			],
			callback: function (action, bank) {
				cmd = 'PRESET:\nRecall:' + action.options.source + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.test_pattern = {
			name: 'Test pattern',
			options: [
				{
					type: 'dropdown',
					label: 'Test Pattern',
					id: 'testPattern',
					default: 'None',
					choices: self.testPattern,
				},
				{
					type: 'dropdown',
					label: 'No Signal',
					id: 'noSignal',
					default: 'Black',
					choices: self.noSignal,
				},
				{
					type: 'dropdown',
					label: 'Test Tone',
					id: 'testTone',
					default: 'None',
					choices: self.testTone,
				},
				{
					type: 'dropdown',
					label: 'Motion',
					id: 'testPatternMotion',
					default: 'false',
					choices: self.testPatternMotion,
				},
				{
					type: 'dropdown',
					label: 'Horizontal rate',
					id: 'horizontalRate',
					default: '0',
					choices: self.horizontalRate,
				},
			],
			callback: function (action, bank) {
				cmd =
					'TEST PATTERN:\nOutput:' +
					action.options.testPattern +
					'\nNo Signal:' +
					action.options.noSignal +
					'\nTest Tone:' +
					action.options.testTone +
					'\nMotion:' +
					action.options.testPatternMotion +
					'\nHorizontal rate:' +
					action.options.horizontalRate +
					'\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.output_display = {
			name: 'Output display',
			options: [
				{
					type: 'dropdown',
					label: 'Output display',
					id: 'outputDisplay',
					default: 'Input',
					choices: self.outputDisplay,
				},
				{
					type: 'number',
					label: 'Transition Settings',
					id: 'transitionSetting',
					default: 0,
					min: 0,
					max: 50,
					required: false,
					tooltip: 'Enter 0 to 50. Example: 1.5 seconds, enter 15. Example: 5 seconds, enter 50. No decimals.',
				},
			],
			callback: function (action, bank) {
				cmd =
					'VIDEO OUTPUT:\nOutput option:' +
					action.options.outputDisplay +
					'\n' +
					'Transition setting:' +
					action.options.transitionSetting +
					'\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.output_format = {
			name: 'Output format',
			options: [
				{
					type: 'dropdown',
					label: 'Output Format',
					id: 'outputFormats',
					default: '1080i5994',
					choices: self.output_formats,
				},
			],
			callback: function (action, bank) {
				cmd = 'VIDEO OUTPUT:\nVideo mode:' + action.options.outputFormats + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variable_aspect_ratio = {
			name: 'Variable aspect ratio',
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
					choices: self.zoomCrop,
				},
			],
			callback: function (action, bank) {
				cmd =
					'VARIABLE ASPECT RATIO:' +
					'\n' +
					'Variable Aspect Ratio size X left:' +
					action.options.horizontalSize +
					'\n' +
					'Variable Aspect Ratio size Y left:' +
					action.options.verticalSize +
					'\n' +
					'Variable Aspect Ratio pos X left:' +
					action.options.horizontalPosition +
					'\n' +
					'Variable Aspect Ratio pos Y left:' +
					action.options.verticalPosition +
					'\n' +
					'Variable Aspect Ratio trim X left:' +
					action.options.horizontalTrim +
					'\n' +
					'Variable Aspect Ratio trim Y left:' +
					action.options.verticalTrim +
					'\n' +
					'Variable Aspect Ratio zoom/crop:' +
					action.options.zoomCrop +
					'\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_red = {
			name: 'Set Video Adjust Red Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < -200) {
					value = -200
				} else if (value > 200) {
					value = 200
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Red Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO ADJUST:\nRed:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_red_increase = {
			name: 'Increase Video Adjust Red Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.red

				value++

				if (value > 200) {
					value = 200
				}

				let cmd = 'VIDEO ADJUST:\nRed:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_red_decrease = {
			name: 'Decrease Video Adjust Red Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.red

				value--

				if (value < -200) {
					value = -200
				}

				let cmd = 'VIDEO ADJUST:\nRed:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_green = {
			name: 'Set Video Adjust Green Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < -200) {
					value = -200
				} else if (value > 200) {
					value = 200
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Green Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO ADJUST:\nGreen:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_green_increase = {
			name: 'Increase Video Adjust Green Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.green

				value++

				if (value > 200) {
					value = 200
				}

				let cmd = 'VIDEO ADJUST:\nGreen:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_green_decrease = {
			name: 'Decrease Video Adjust Green Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.green

				value--

				if (value < -200) {
					value = -200
				}

				let cmd = 'VIDEO ADJUST:\nGreen:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_blue = {
			name: 'Set Video Adjust Blue Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < -200) {
					value = -200
				} else if (value > 200) {
					value = 200
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Blue Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO ADJUST:\nBlue:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_blue_increase = {
			name: 'Increase Video Adjust Blue Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.blue

				value++

				if (value > 200) {
					value = 200
				}

				let cmd = 'VIDEO ADJUST:\nBlue:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_blue_decrease = {
			name: 'Decrease Video Adjust Blue Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.blue

				value--

				if (value < -200) {
					value = -200
				}

				let cmd = 'VIDEO ADJUST:\nBlue:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_lumalow = {
			name: 'Set Video Adjust Luma Low Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '4',
					tooltip: 'Value between 4 - 1018',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < 4) {
					value = 4
				} else if (value > 1018) {
					value = 1018
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Luma Low Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO ADJUST:\nLuma low:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_lumalow_increase = {
			name: 'Increase Video Adjust Luma Low Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.luma_low

				value++

				if (value > 1018) {
					value = 1018
				}

				let cmd = 'VIDEO ADJUST:\nLuma low:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_lumalow_decrease = {
			name: 'Decrease Video Adjust Luma Low Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.luma_low

				value--

				if (value < 4) {
					value = 4
				}

				let cmd = 'VIDEO ADJUST:\nLuma low:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_lumahigh = {
			name: 'Set Video Adjust Luma High Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '1019',
					tooltip: 'Value between 5 - 1019',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < 4) {
					value = 4
				} else if (value > 1019) {
					value = 1019
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Luma High Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO ADJUST:\nLuma high:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_lumahigh_increase = {
			name: 'Increase Video Adjust Luma High Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.luma_high

				value++

				if (value > 1019) {
					value = 1019
				}

				let cmd = 'VIDEO ADJUST:\nLuma high:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_lumahigh_decrease = {
			name: 'Decrease Video Adjust Luma High Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.luma_high

				value--

				if (value < 5) {
					value = 5
				}

				let cmd = 'VIDEO ADJUST:\nLuma high:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_chromalow = {
			name: 'Set Video Adjust Chroma Low Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '4',
					tooltip: 'Value between 4 - 1018',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < 4) {
					value = 4
				} else if (value > 1018) {
					value = 1018
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Chroma Low Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO ADJUST:\nChroma low:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_chromalow_increase = {
			name: 'Increase Video Adjust Chroma Low Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.chroma_low

				value++

				if (value > 1018) {
					value = 1018
				}

				let cmd = 'VIDEO ADJUST:\nChroma low:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_chromalow_decrease = {
			name: 'Decrease Video Adjust Chroma Low Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.chroma_low

				value--

				if (value < 4) {
					value = 4
				}

				let cmd = 'VIDEO ADJUST:\nChroma low:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_chromahigh = {
			name: 'Set Video Adjust Chroma High Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '1019',
					tooltip: 'Value between 5 - 1019',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < 4) {
					value = 4
				} else if (value > 1019) {
					value = 1019
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Chroma High Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO ADJUST:\nChroma high:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_chromahigh_increase = {
			name: 'Increase Video Adjust Chroma High Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.chroma_high

				value++

				if (value > 1019) {
					value = 1019
				}

				let cmd = 'VIDEO ADJUST:\nChroma high:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_chromahigh_decrease = {
			name: 'Decrease Video Adjust Chroma High Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.chroma_high

				value--

				if (value < 5) {
					value = 5
				}

				let cmd = 'VIDEO ADJUST:\nChroma high:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_aspect_fill_luma = {
			name: 'Set Video Adjust Aspect Fill Luma Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '64',
					tooltip: 'Value between 64 - 940',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < 64) {
					value = 64
				} else if (value > 940) {
					value = 940
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Aspect Fill Luma Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO ADJUST:\nAspect fill luma:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_aspect_fill_luma_increase = {
			name: 'Increase Video Adjust Aspect Fill Luma Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.aspect_fill_luma

				value++

				if (value > 940) {
					value = 940
				}

				let cmd = 'VIDEO ADJUST:\nAspect fill luma:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_aspect_fill_luma_decrease = {
			name: 'Decrease Video Adjust Aspect Fill Luma Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.aspect_fill_luma

				value--

				if (value < 64) {
					value = 64
				}

				let cmd = 'VIDEO ADJUST:\nAspect fill luma:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_aspect_fill_cb = {
			name: 'Set Video Adjust Aspect Fill Cb Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '512',
					tooltip: 'Value between 64 - 960',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < 64) {
					value = 64
				} else if (value > 960) {
					value = 960
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Aspect Fill Cb Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO ADJUST:\nAspect fill Cb:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_aspect_fill_cb_increase = {
			name: 'Increase Video Adjust Aspect Fill Cb Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.aspect_fill_cb

				value++

				if (value > 960) {
					value = 960
				}

				let cmd = 'VIDEO ADJUST:\nAspect fill Cb:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_aspect_fill_cb_decrease = {
			name: 'Decrease Video Adjust Aspect Fill Cb Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.aspect_fill_cb

				value--

				if (value < 64) {
					value = 64
				}

				let cmd = 'VIDEO ADJUST:\nAspect fill Cb:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_aspect_fill_cr = {
			name: 'Set Video Adjust Aspect Fill Cr Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '512',
					tooltip: 'Value between 64 - 960',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < 64) {
					value = 64
				} else if (value > 960) {
					value = 960
				}
				if (isNaN(value)) {
					self.log('error', 'Video Adjust Aspect Fill Cr Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO ADJUST:\nAspect fill Cr:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_aspect_fill_cr_increase = {
			name: 'Increase Video Adjust Aspect Fill Cr Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.aspect_fill_cr

				value++

				if (value > 960) {
					value = 960
				}

				let cmd = 'VIDEO ADJUST:\nAspect fill Cr:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadjust_aspect_fill_cr_decrease = {
			name: 'Decrease Video Adjust Aspect Fill Cr Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_adjust.aspect_fill_cr

				value--

				if (value < 64) {
					value = 64
				}

				let cmd = 'VIDEO ADJUST:\nAspect fill Cr:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_gain = {
			name: 'Set Video Proc Amp Gain Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -60 to +60',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < -60) {
					value = -60
				} else if (value > 60) {
					value = 60
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp Gain Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO PROC AMP:\nGain:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_gain_increase = {
			name: 'Increase Video Proc Amp Gain Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.gain

				value++

				if (value > 60) {
					value = 60
				}

				let cmd = 'VIDEO PROC AMP:\nGain:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_gain_decrease = {
			name: 'Decrease Video Proc Amp Gain Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.gain

				value--

				if (value < -60) {
					value = 60
				}

				let cmd = 'VIDEO PROC AMP:\nGain:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_black = {
			name: 'Set Video Proc Amp Black Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -30 to +30',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < -30) {
					value = -30
				} else if (value > 30) {
					value = 30
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp Black Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO PROC AMP:\nBlack:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_black_increase = {
			name: 'Increase Video Proc Amp Black Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.black

				value++

				if (value > 30) {
					value = 30
				}

				let cmd = 'VIDEO PROC AMP:\nBlack:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_black_decrease = {
			name: 'Decrease Video Proc Amp Black Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.black

				value--

				if (value < -30) {
					value = 30
				}

				let cmd = 'VIDEO PROC AMP:\nBlack:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_saturation = {
			name: 'Set Video Proc Saturation Gain Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -60 to +60',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < -60) {
					value = -60
				} else if (value > 60) {
					value = 60
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp Saturation Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO PROC AMP:\nSaturation:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_saturation_increase = {
			name: 'Increase Video Proc Amp Saturation Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.saturation

				value++

				if (value > 60) {
					value = 60
				}

				let cmd = 'VIDEO PROC AMP:\nSaturation:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_saturation_decrease = {
			name: 'Decrease Video Proc Amp Saturation Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.saturation

				value--

				if (value < -60) {
					value = 60
				}

				let cmd = 'VIDEO PROC AMP:\nSaturation:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_hue = {
			name: 'Set Video Proc Amp Hue Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -179 to +180',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < -179) {
					value = -179
				} else if (value > 180) {
					value = 180
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp Hue Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO PROC AMP:\nHue:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_hue_increase = {
			name: 'Increase Video Proc Amp Hue Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.hue

				value++

				if (value > 180) {
					value = 180
				}

				let cmd = 'VIDEO PROC AMP:\nHue:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_hue_decrease = {
			name: 'Decrease Video Proc Amp Hue Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.hue

				value--

				if (value < -179) {
					value = 179
				}

				let cmd = 'VIDEO PROC AMP:\nHue:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_ry = {
			name: 'Set Video Proc Amp RY Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < -200) {
					value = -200
				} else if (value > 200) {
					value = 200
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp RY Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO PROC AMP:\nRY:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_ry_increase = {
			name: 'Increase Video Proc Amp RY Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.ry

				value++

				if (value > 200) {
					value = 200
				}

				let cmd = 'VIDEO PROC AMP:\nRY:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_ry_decrease = {
			name: 'Decrease Video Proc Amp RY Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.ry

				value--

				if (value < -200) {
					value = 200
				}

				let cmd = 'VIDEO PROC AMP:\nRY:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_by = {
			name: 'Set Video Proc Amp BY Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < -200) {
					value = -200
				} else if (value > 200) {
					value = 200
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp BY Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO PROC AMP:\nBY:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_by_increase = {
			name: 'Increase Video Proc Amp BY Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.by

				value++

				if (value > 200) {
					value = 200
				}

				let cmd = 'VIDEO PROC AMP:\nBY:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_by_decrease = {
			name: 'Decrease Video Proc Amp BY Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.by

				value--

				if (value < -200) {
					value = 200
				}

				let cmd = 'VIDEO PROC AMP:\nBY:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_sharp = {
			name: 'Set Video Proc Amp Sharp Value',
			options: [
				{
					type: 'textwithvariables',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -50 to +50',
				},
			],
			callback: function (action, bank) {
				let value = parseInt(action.options.value)
				if (value < -50) {
					value = -50
				} else if (value > 50) {
					value = 50
				}
				if (isNaN(value)) {
					self.log('error', 'Video Proc Amp Sharp Value is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VIDEO PROC AMP:\nSharp:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_sharp_increase = {
			name: 'Increase Video Proc Amp Sharp Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.sharp

				value++

				if (value > 50) {
					value = 50
				}

				let cmd = 'VIDEO PROC AMP:\nSharp:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoprocamp_sharp_decrease = {
			name: 'Decrease Video Proc Amp Sharp Value by 1',
			options: [],
			callback: function (action, bank) {
				let value = self.data.video_procamp.sharp

				value--

				if (value < -50) {
					value = 50
				}

				let cmd = 'VIDEO PROC AMP:\nSharp:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.genlock_reference = {
			name: 'Genlock - Select Reference Output Signal (AV Only)',
			options: [
				{
					type: 'dropdown',
					id: 'reference',
					default: 'Blackburst',
					choices: [
						{ id: 'Blackburst', label: 'Blackburst' },
						{ id: 'TriLevel', label: 'TriLevel' },
					],
				},
			],
			callback: function (action, bank) {
				let value = self.data.genlock.reference

				let cmd = 'GENLOCK:\nGen reference: ' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.genlock_pixeloffset_increase = {
			name: 'Increase Genlock Pixel Offset Value by X',
			options: [
				{
					type: 'textinput',
					label: 'Steps',
					id: 'steps',
					default: '1',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = self.data.genlock.pixeloffset

				let steps = await self.parseVariablesInString(action.options.steps)

				//make sure it is a number
				let intSteps = parseInt(steps)

				if (isNaN(intSteps)) {
					self.log('error', 'Genlock Pixel Offset Steps is not valid: ' + steps)
					return
				}

				value = value + intSteps

				//find the min/max range out of the output_formats object
				let outputFormatObj = self.output_formats.find((OUTPUT) => OUTPUT.id === self.output_format)

				if (outputFormatObj !== undefined && outputFormatObj.pixel_offset_max !== undefined) {
					if (value > outputFormatObj.pixel_offset_max) {
						value = outputFormatObj.pixel_offset_max
					}

					let cmd = 'GENLOCK:\nPixel offset: ' + value + '\n\n'
					self.sendCommand(cmd)
				} else {
					self.log('error', 'Could not find output format pixel offset values for: ' + self.output_format)
					return
				}
			},
		}

		actions.genlock_pixeloffset_decrease = {
			name: 'Decrease Genlock Pixel Offset Value by X',
			options: [
				{
					type: 'textinput',
					label: 'Steps',
					id: 'steps',
					default: '1',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = self.data.genlock.pixeloffset

				let steps = await self.parseVariablesInString(action.options.steps)

				//make sure it is a number
				let intSteps = parseInt(steps)

				if (isNaN(intSteps)) {
					self.log('error', 'Genlock Pixel Offset Steps is not valid: ' + steps)
					return
				}

				value = value - intSteps

				//find the min/max range out of the output_formats object
				let outputFormatObj = self.output_formats.find((OUTPUT) => OUTPUT.id === self.output_format)

				if (outputFormatObj !== undefined && outputFormatObj.pixel_offset_min !== undefined) {
					if (value < outputFormatObj.pixel_offset_min) {
						value = outputFormatObj.pixel_offset_min
					}

					let cmd = 'GENLOCK:\nPixel offset: ' + value + '\n\n'
					self.sendCommand(cmd)
				} else {
					self.log('error', 'Could not find output format pixel offset values for: ' + self.output_format)
					return
				}
			},
		}

		actions.genlock_pixeloffset_rangetop = {
			name: 'Set Genlock Pixel Offset Value to Top of Range',
			options: [],
			callback: async function (action, bank) {
				//find the min/max range out of the output_formats object
				let outputFormatObj = self.output_formats.find((OUTPUT) => OUTPUT.id === self.output_format)

				if (outputFormatObj !== undefined && outputFormatObj.pixel_offset_max !== undefined) {
					let value = outputFormatObj.pixel_offset_max
					let cmd = 'GENLOCK:\nPixel offset: ' + value + '\n\n'
					self.sendCommand(cmd)
				} else {
					self.log('error', 'Could not find output format pixel offset values for: ' + self.output_format)
					return
				}
			},
		}

		actions.genlock_pixeloffset_rangebottom = {
			name: 'Set Genlock Pixel Offset Value to Bottom of Range',
			options: [],
			callback: async function (action, bank) {
				//find the min/max range out of the output_formats object
				let outputFormatObj = self.output_formats.find((OUTPUT) => OUTPUT.id === self.output_format)

				if (outputFormatObj !== undefined && outputFormatObj.pixel_offset_min !== undefined) {
					let value = outputFormatObj.pixel_offset_min
					let cmd = 'GENLOCK:\nPixel offset: ' + value + '\n\n'
					self.sendCommand(cmd)
				} else {
					self.log('error', 'Could not find output format pixel offset values for: ' + self.output_format)
					return
				}
			},
		}

		actions.genlock_lineoffset_increase = {
			name: 'Increase Genlock Line Offset Value by X',
			options: [
				{
					type: 'textinput',
					label: 'Steps',
					id: 'steps',
					default: '1',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = self.data.genlock.lineoffset

				let steps = await self.parseVariablesInString(action.options.steps)

				//make sure it is a number
				let intSteps = parseInt(steps)

				if (isNaN(intSteps)) {
					self.log('error', 'Genlock Line Offset Steps is not valid: ' + steps)
					return
				}

				value = value + intSteps

				//find the min/max range out of the output_formats object
				let outputFormatObj = self.output_formats.find((OUTPUT) => OUTPUT.id === self.output_format)

				if (outputFormatObj !== undefined && outputFormatObj.line_offset_max !== undefined) {
					if (value > outputFormatObj.line_offset_max) {
						value = outputFormatObj.line_offset_max
					}

					let cmd = 'GENLOCK:\nLine offset: ' + value + '\n\n'
					self.sendCommand(cmd)
				} else {
					self.log('error', 'Could not find output format line offset values for: ' + self.output_format)
					return
				}
			},
		}

		actions.genlock_lineoffset_decrease = {
			name: 'Decrease Genlock Line Offset Value by X',
			options: [
				{
					type: 'textinput',
					label: 'Steps',
					id: 'steps',
					default: '1',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = self.data.genlock.lineoffset

				let steps = await self.parseVariablesInString(action.options.steps)

				//make sure it is a number
				let intSteps = parseInt(steps)

				if (isNaN(intSteps)) {
					self.log('error', 'Genlock Line Offset Steps is not valid: ' + steps)
					return
				}

				value = value - intSteps

				//find the min/max range out of the output_formats object
				let outputFormatObj = self.output_formats.find((OUTPUT) => OUTPUT.id === self.output_format)

				if (outputFormatObj !== undefined && outputFormatObj.line_offset_min !== undefined) {
					if (value < outputFormatObj.line_offset_min) {
						value = outputFormatObj.line_offset_min
					}

					let cmd = 'GENLOCK:\nLine offset: ' + value + '\n\n'
					self.sendCommand(cmd)
				} else {
					self.log('error', 'Could not find output format line offset values for: ' + self.output_format)
					return
				}
			},
		}

		actions.genlock_lineoffset_rangetop = {
			name: 'Set Genlock Line Offset Value to Top of Range',
			options: [],
			callback: async function (action, bank) {
				//find the min/max range out of the output_formats object
				let outputFormatObj = self.output_formats.find((OUTPUT) => OUTPUT.id === self.output_format)

				if (outputFormatObj !== undefined && outputFormatObj.line_offset_max !== undefined) {
					let value = outputFormatObj.line_offset_max
					let cmd = 'GENLOCK:\nLine offset: ' + value + '\n\n'
					self.sendCommand(cmd)
				} else {
					self.log('error', 'Could not find output format line offset values for: ' + self.output_format)
					return
				}
			},
		}

		actions.genlock_lineoffset_rangebottom = {
			name: 'Set Genlock Line Offset Value to Bottom of Range',
			options: [],
			callback: async function (action, bank) {
				//find the min/max range out of the output_formats object
				let outputFormatObj = self.output_formats.find((OUTPUT) => OUTPUT.id === self.output_format)

				if (outputFormatObj !== undefined && outputFormatObj.line_offset_min !== undefined) {
					let value = outputFormatObj.line_offset_min
					let cmd = 'GENLOCK:\nLine offset: ' + value + '\n\n'
					self.sendCommand(cmd)
				} else {
					self.log('error', 'Could not find output format line offset values for: ' + self.output_format)
					return
				}
			},
		}

		actions.genlock_type = {
			name: 'Genlock - Select Reference Source',
			options: [
				{
					type: 'dropdown',
					id: 'source',
					default: 'Internal',
					choices: [
						{ id: 'Input', label: 'Input (AV Only)' },
						{ id: 'Internal', label: 'Internal' },
						{ id: 'External', label: 'External' },
					],
				},
			],
			callback: function (action, bank) {
				let value = self.data.genlock.source

				let cmd = 'GENLOCK:\nType: ' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		self.setActionDefinitions(actions)
	},
}
