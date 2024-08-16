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

		//Noise Reduction Actions
		actions.noisereduction_enabled = {
			name: 'Noise Reduction - Enable Noise Reduction',
			options: [],
			callback: function (action, bank) {
				cmd = 'NOISE REDUCTION:\nEnabled: ON\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.noisereduction_disabled = {
			name: 'Noise Reduction - Disable Noise Reduction',
			options: [],
			callback: function (action, bank) {
				cmd = 'NOISE REDUCTION:\nEnabled: OFF\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.noisereduction_bias_set = {
			name: 'Noise Reduction - Set Noise Reduction Bias',
			options: [
				{
					type: 'textinput',
					label: 'Bias',
					id: 'bias',
					default: '0',
					tooltip: 'Value between -3 to +3',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let bias = parseInt(await self.parseVariablesInString(action.options.bias))
				cmd = 'NOISE REDUCTION:\nBias: ' + bias + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.noisereduction_bias_increase = {
			name: 'Noise Reduction - Increase Noise Reduction Bias',
			options: [
				{
					type: 'textinput',
					label: 'Bias Increase Value',
					id: 'bias',
					default: '0',
					tooltip: 'Value between -3 to +3',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get current bias amount, or assume 0 if not found
				let bias = parseInt(self.data.noiseReduction?.bias) || 0
				//get the increase amount from the action options
				let increase = parseInt(await self.parseVariablesInString(action.options.bias))
				//add the increase amount to the current bias
				bias += increase
				cmd = 'NOISE REDUCTION:\nBias: ' + bias + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.noisereduction_bias_decrease = {
			name: 'Noise Reduction - Decrease Noise Reduction Bias',
			options: [
				{
					type: 'textinput',
					label: 'Bias Decrease Value',
					id: 'bias',
					default: '0',
					tooltip: 'Value between -3 to +3',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get current bias amount, or assume 0 if not found
				let bias = parseInt(self.data.noiseReduction?.bias) || 0
				//get the decrease amount from the action options
				let decrease = parseInt(await self.parseVariablesInString(action.options.bias))
				//subtract the decrease amount from the current bias
				bias -= decrease
				cmd = 'NOISE REDUCTION:\nBias: ' + bias + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.noisereduction_splitscreen_enable = {
			name: 'Noise Reduction - Enable Split Screen',
			options: [],
			callback: function (action, bank) {
				cmd = 'NOISE REDUCTION:\nSplit screen: ON\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.noisereduction_splitscreen_disable = {
			name: 'Noise Reduction - Disable Split Screen',
			options: [],
			callback: function (action, bank) {
				cmd = 'NOISE REDUCTION:\nSplit screen: OFF\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.noisereduction_redoverlay_enable = {
			name: 'Noise Reduction - Enable Red Overlay',
			options: [],
			callback: function (action, bank) {
				cmd = 'NOISE REDUCTION:\nRed overlay: ON\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.noisereduction_redoverlay_disable = {
			name: 'Noise Reduction - Disable Red Overlay',
			options: [],
			callback: function (action, bank) {
				cmd = 'NOISE REDUCTION:\nRed overlay: OFF\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadvanced_cleancadence_enable = {
			name: 'Video Advanced - Enable Clean Cadence',
			options: [],
			callback: function (action, bank) {
				cmd = 'VIDEO ADVANCED:\nClean cadence: ' + 'ON' + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadvanced_cleancadence_disable = {
			name: 'Video Advanced - Disable Clean Cadence',
			options: [],
			callback: function (action, bank) {
				cmd = 'VIDEO ADVANCED:\nClean cadence: ' + 'OFF' + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadvanced_scenecutdetect_enable = {
			name: 'Video Advanced - Enable Scene Cut Detection',
			options: [],
			callback: function (action, bank) {
				cmd = 'VIDEO ADVANCED:\nScenecut detect: ' + 'ON' + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadvanced_scenecutdetect_disable = {
			name: 'Video Advanced - Disable Scene Cut Detection',
			options: [],
			callback: function (action, bank) {
				cmd = 'VIDEO ADVANCED:\nScenecut detect: ' + 'OFF' + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadvanced_sourcetype = {
			name: 'Video Advanced - Set Source Type',
			options: [
				{
					type: 'dropdown',
					label: 'Source Type',
					id: 'sourceType',
					default: 'Auto',
					choices: [
						{ id: 'Auto', label: 'Auto' },
						{ id: 'Video', label: 'Video' },
						{ id: 'Film', label: 'Film' },
					],
				},
			],
			callback: function (action, bank) {
				cmd = 'VIDEO ADVANCED:\nSource type: ' + action.options.sourceType + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadvanced_frcaperture = {
			name: 'Video Advanced - Set FRC Aperture',
			options: [
				{
					type: 'dropdown',
					label: 'Aperture',
					id: 'aperture',
					default: '0',
					choices: [
						{ id: '0', label: '0' },
						{ id: '1', label: '1' },
						{ id: '2', label: '2' },
						{ id: '3', label: '3' },
					],
				},
			],
			callback: function (action, bank) {
				cmd = 'VIDEO ADVANCED:\nFRC aperture: ' + action.options.aperture + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.videoadvanced_processing = {
			name: 'Video Advanced - Set Processing',
			options: [
				{
					type: 'dropdown',
					label: 'Processing',
					id: 'processing',
					default: 'Lowest Latency',
					choices: [
						{ id: 'Lowest Latency', label: 'Lowest Latency' },
						{ id: 'Highest Quality', label: 'Highest Quality' },
					],
				},
			],
			callback: function (action, bank) {
				cmd = 'VIDEO ADVANCED:\nProcessing: ' + action.options.processing + '\n\n'
				self.sendCommand(cmd)
			},
		}

		//Preset Actions
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

		actions.save_preset = {
			name: 'Save preset',
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
				cmd = 'PRESET:\nSave:' + action.options.source + '\n\n'
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
			name: 'Video Output - Output display',
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
			name: 'Video Output - Output format',
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
			name: 'Variable Aspect Ratio - Set all properties',
			options: [
				{
					type: 'checkbox',
					label: 'Send Horizontal Size Property',
					id: 'sendHorizontalSize',
					default: true,
				},
				{
					type: 'textinput',
					label: 'Horizontal Size',
					id: 'horizontalSize',
					default: 0,
					min: -9999,
					max: 9999,
					required: false,
					tooltip: 'Maximum/Minimum range is half minus one of the horizontal size.',
					useVariables: true,
					isVisible: (options) => options.sendHorizontalSize,
				},
				{
					type: 'checkbox',
					label: 'Send Vertical Size Property',
					id: 'sendVerticalSize',
					default: true,
				},
				{
					type: 'textinput',
					label: 'Vertical Size',
					id: 'verticalSize',
					default: 0,
					min: -9999,
					max: 9999,
					required: false,
					tooltip: 'Maximum/Minimum range is half minus one of the vertical size.',
					useVariables: true,
					isVisible: (options) => options.sendVerticalSize,
				},
				{
					type: 'checkbox',
					label: 'Send Horizontal Position Property',
					id: 'sendHorizontalPosition',
					default: true,
				},
				{
					type: 'textinput',
					label: 'Horizontal Position',
					id: 'horizontalPosition',
					default: 0,
					min: -9999,
					max: 9999,
					required: false,
					tooltip: ' Maximum/Minimum range is half minus one of the horizontal size.',
					useVariables: true,
					isVisible: (options) => options.sendHorizontalPosition,
				},
				{
					type: 'checkbox',
					label: 'Send Vertical Position Property',
					id: 'sendVerticalPosition',
					default: true,
				},
				{
					type: 'textinput',
					label: 'Vertical Position',
					id: 'verticalPosition',
					default: 0,
					min: -9999,
					max: 9999,
					required: false,
					tooltip: ' Maximum/Minimum range is half minus one of the vertical size.',
					useVariables: true,
					isVisible: (options) => options.sendVerticalPosition,
				},
				{
					type: 'checkbox',
					label: 'Send Horizontal Trim Property',
					id: 'sendHorizontalTrim',
					default: true,
				},
				{
					type: 'textinput',
					label: 'Horizontal Trim',
					id: 'horizontalTrim',
					default: 0,
					min: 0,
					max: 9999,
					required: false,
					tooltip: ' Maximum range is half minus one of the horizontal size.',
					useVariables: true,
					isVisible: (options) => options.sendHorizontalTrim,
				},
				{
					type: 'checkbox',
					label: 'Send Vertical Trim Property',
					id: 'sendVerticalTrim',
					default: true,
				},
				{
					type: 'textinput',
					label: 'Vertical Trim',
					id: 'verticalTrim',
					default: 0,
					min: 0,
					max: 9999,
					required: false,
					tooltip: ' Maximum range is half minus one of the vertical size.',
					useVariables: true,
					isVisible: (options) => options.sendVerticalTrim,
				},
				{
					type: 'checkbox',
					label: 'Send Zoom/Crop Property',
					id: 'sendZoomCrop',
					default: true,
				},
				{
					type: 'dropdown',
					label: 'Zoom/Crop',
					id: 'zoomCrop',
					default: 'false',
					choices: self.zoomCrop,
					isVisible: (options) => options.sendZoomCrop,
				},
			],
			callback: async function (action, bank) {
				cmd = 'VARIABLE ASPECT RATIO:' + '\n'

				if (action.options.sendHorizontalSize) {
					let horizontalSize = await self.parseVariablesInString(action.options.horizontalSize)
					cmd += 'Variable Aspect Ratio size X left:' + horizontalSize + '\n'
				}

				if (action.options.sendVerticalSize) {
					let verticalSize = await self.parseVariablesInString(action.options.verticalSize)
					cmd += 'Variable Aspect Ratio size Y left:' + verticalSize + '\n'
				}

				if (action.options.sendHorizontalPosition) {
					let horizontalPosition = await self.parseVariablesInString(action.options.horizontalPosition)
					cmd += 'Variable Aspect Ratio pos X left:' + horizontalPosition + '\n'
				}

				if (action.options.sendVerticalPosition) {
					let verticalPosition = await self.parseVariablesInString(action.options.verticalPosition)
					cmd += 'Variable Aspect Ratio pos Y left:' + verticalPosition + '\n'
				}

				if (action.options.sendHorizontalTrim) {
					let horizontalTrim = await self.parseVariablesInString(action.options.horizontalTrim)
					cmd += 'Variable Aspect Ratio trim X left:' + horizontalTrim + '\n'
				}

				if (action.options.sendVerticalTrim) {
					let verticalTrim = await self.parseVariablesInString(action.options.verticalTrim)
					cmd += 'Variable Aspect Ratio trim Y left:' + verticalTrim + '\n'
				}

				if (action.options.sendZoomCrop) cmd += 'Variable Aspect Ratio zoom/crop:' + action.options.zoomCrop + '\n'

				cmd += '\n'

				self.sendCommand(cmd)
			},
		}

		//individual Variable Aspect commands
		actions.variableaspectratio_horizontal_size = {
			name: 'Variable Aspect Ratio - Set Horizontal Size',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
				if (isNaN(value)) {
					self.log('error', 'Variable Aspect Ratio Horizontal Size is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio size X left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_horizontal_size_increase = {
			name: 'Variable Aspect Ratio - Increase Horizontal Size by X',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get existing value
				let value = self.data.variableAspectRatio?.sizeXLeft || 0

				//get the increase amount from the action options
				let increase = parseInt(await self.parseVariablesInString(action.options.value))

				//add the increase amount to the current value
				value += increase

				if (value > 9999) {
					value = 9999
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio size X left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_horizontal_size_decrease = {
			name: 'Variable Aspect Ratio - Decrease Horizontal Size by X',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get existing value
				let value = self.data.variableAspectRatio?.sizeXLeft || 0

				//get the decrease amount from the action options
				let decrease = parseInt(await self.parseVariablesInString(action.options.value))

				//subtract the decrease amount from the current value
				value -= decrease

				if (value < -9999) {
					value = -9999
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio size X left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_vertical_size = {
			name: 'Variable Aspect Ratio - Set Vertical Size',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
				if (isNaN(value)) {
					self.log('error', 'Variable Aspect Ratio Vertical Size is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio size Y left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_vertical_size_increase = {
			name: 'Variable Aspect Ratio - Increase Vertical Size by X',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get existing value
				let value = self.data.variableAspectRatio?.sizeYLeft || 0

				//get the increase amount from the action options
				let increase = parseInt(await self.parseVariablesInString(action.options.value))

				//add the increase amount to the current value
				value += increase

				if (value > 9999) {
					value = 9999
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio size Y left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_vertical_size_decrease = {
			name: 'Variable Aspect Ratio - Decrease Vertical Size by X',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get existing value
				let value = self.data.variableAspectRatio?.sizeYLeft || 0

				//get the decrease amount from the action options
				let decrease = parseInt(await self.parseVariablesInString(action.options.value))

				//subtract the decrease amount from the current value
				value -= decrease

				if (value < -9999) {
					value = -9999
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio size Y left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_horizontal_position = {
			name: 'Variable Aspect Ratio - Set Horizontal Position',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
				if (isNaN(value)) {
					self.log('error', 'Variable Aspect Ratio Horizontal Position is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio pos X left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_horizontal_position_increase = {
			name: 'Variable Aspect Ratio - Increase Horizontal Position by X',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get existing value
				let value = self.data.variableAspectRatio?.posXLeft || 0

				//get the increase amount from the action options
				let increase = parseInt(await self.parseVariablesInString(action.options.value))

				//add the increase amount to the current value
				value += increase

				if (value > 9999) {
					value = 9999
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio pos X left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_horizontal_position_decrease = {
			name: 'Variable Aspect Ratio - Decrease Horizontal Position by X',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get existing value
				let value = self.data.variableAspectRatio?.posXLeft || 0

				//get the decrease amount from the action options
				let decrease = parseInt(await self.parseVariablesInString(action.options.value))

				//subtract the decrease amount from the current value
				value -= decrease

				if (value < -9999) {
					value = -9999
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio pos X left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_vertical_position = {
			name: 'Variable Aspect Ratio - Set Vertical Position',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
				if (isNaN(value)) {
					self.log('error', 'Variable Aspect Ratio Vertical Position is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio pos Y left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_vertical_position_increase = {
			name: 'Variable Aspect Ratio - Increase Vertical Position by X',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get existing value
				let value = self.data.variableAspectRatio?.posYLeft || 0

				//get the increase amount from the action options
				let increase = parseInt(await self.parseVariablesInString(action.options.value))

				//add the increase amount to the current value
				value += increase

				if (value > 9999) {
					value = 9999
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio pos Y left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_vertical_position_decrease = {
			name: 'Variable Aspect Ratio - Decrease Vertical Position by X',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get existing value
				let value = self.data.variableAspectRatio?.posYLeft || 0

				//get the decrease amount from the action options
				let decrease = parseInt(await self.parseVariablesInString(action.options.value))

				//subtract the decrease amount from the current value
				value -= decrease

				if (value < -9999) {
					value = -9999
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio pos Y left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_horizontal_trim = {
			name: 'Variable Aspect Ratio - Set Horizontal Trim',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between 0 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
				if (isNaN(value)) {
					self.log('error', 'Variable Aspect Ratio Horizontal Trim is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio trim X left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_horizontal_trim_increase = {
			name: 'Variable Aspect Ratio - Increase Horizontal Trim by X',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get existing value
				let value = self.data.variableAspectRatio?.trimXLeft || 0

				//get the increase amount from the action options
				let increase = parseInt(await self.parseVariablesInString(action.options.value))

				//add the increase amount to the current value
				value += increase

				if (value > 9999) {
					value = 9999
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio trim X left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_horizontal_trim_decrease = {
			name: 'Variable Aspect Ratio - Decrease Horizontal Trim by X',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get existing value
				let value = self.data.variableAspectRatio?.trimXLeft || 0

				//get the decrease amount from the action options
				let decrease = parseInt(await self.parseVariablesInString(action.options.value))

				//subtract the decrease amount from the current value
				value -= decrease

				if (value < -9999) {
					value = -9999
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio trim X left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_vertical_trim = {
			name: 'Variable Aspect Ratio - Set Vertical Trim',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between 0 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
				if (isNaN(value)) {
					self.log('error', 'Variable Aspect Ratio Vertical Trim is not valid: ' + action.options.value)
					return
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio trim Y left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_vertical_trim_increase = {
			name: 'Variable Aspect Ratio - Increase Vertical Trim by X',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get existing value
				let value = self.data.variableAspectRatio?.trimYLeft || 0

				//get the increase amount from the action options
				let increase = parseInt(await self.parseVariablesInString(action.options.value))

				//add the increase amount to the current value
				value += increase

				if (value > 9999) {
					value = 9999
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio trim Y left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_vertical_trim_decrease = {
			name: 'Variable Aspect Ratio - Decrease Vertical Trim by X',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -9999 to 9999',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				//get existing value
				let value = self.data.variableAspectRatio?.trimYLeft || 0

				//get the decrease amount from the action options
				let decrease = parseInt(await self.parseVariablesInString(action.options.value))

				//subtract the decrease amount from the current value
				value -= decrease

				if (value < -9999) {
					value = -9999
				}

				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio trim Y left:' + value + '\n\n'
				self.sendCommand(cmd)
			},
		}

		actions.variableaspectratio_zoomcrop = {
			name: 'Variable Aspect Ratio - Set Zoom/Crop',
			options: [
				{
					type: 'dropdown',
					label: 'Zoom/Crop',
					id: 'zoomCrop',
					default: 'false',
					choices: self.zoomCrop,
				},
			],
			callback: function (action, bank) {
				let cmd = 'VARIABLE ASPECT RATIO:\nVariable Aspect Ratio zoom/crop:' + action.options.zoomCrop + '\n\n'
				self.sendCommand(cmd)
			},
		}

		//Video Adjust actions
		actions.videoadjust_red = {
			name: 'Video Adjust - Set Red Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Adjust - Increase Red Value by 1',
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
			name: 'Video Adjust - Decrease Red Value by 1',
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
			name: 'Video Adjust - Set Green Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Adjust - Increase Green Value by 1',
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
			name: 'Video Adjust - Decrease Green Value by 1',
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
			name: 'Video Adjust - Set Blue Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Adjust - Increase Blue Value by 1',
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
			name: 'Video Adjust - Decrease Blue Value by 1',
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
			name: 'Video Adjust - Set Luma Low Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '4',
					tooltip: 'Value between 4 - 1018',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Adjust - Increase Luma Low Value by 1',
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
			name: 'Video Adjust - Decrease Luma Low Value by 1',
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
			name: 'Video Adjust - Set Luma High Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '1019',
					tooltip: 'Value between 5 - 1019',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Adjust - Increase Luma High Value by 1',
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
			name: 'Video Adjust - Decrease Luma High Value by 1',
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
			name: 'Video Adjust - Set Chroma Low Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '4',
					tooltip: 'Value between 4 - 1018',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Adjust - Increase Chroma Low Value by 1',
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
			name: 'Video Adjust - Decrease Chroma Low Value by 1',
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
			name: 'Video Adjust - Set Chroma High Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '1019',
					tooltip: 'Value between 5 - 1019',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Adjust - Increase Chroma High Value by 1',
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
			name: 'Video Adjust - Decrease Chroma High Value by 1',
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
			name: 'Video Adjust - Set Aspect Fill Luma Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '64',
					tooltip: 'Value between 64 - 940',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Adjust - Increase Aspect Fill Luma Value by 1',
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
			name: 'Video Adjust - Decrease Aspect Fill Luma Value by 1',
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
			name: 'Video Adjust - Set Aspect Fill Cb Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '512',
					tooltip: 'Value between 64 - 960',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Adjust - Increase Aspect Fill Cb Value by 1',
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
			name: 'Video Adjust - Decrease Aspect Fill Cb Value by 1',
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
			name: 'Video Adjust - Set Aspect Fill Cr Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '512',
					tooltip: 'Value between 64 - 960',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Adjust - Increase Aspect Fill Cr Value by 1',
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
			name: 'Video Adjust - Decrease Aspect Fill Cr Value by 1',
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
			name: 'Video Proc Amp - Set Gain Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -60 to +60',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Proc Amp - Increase Gain Value by 1',
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
			name: 'Video Proc Amp - Decrease Gain Value by 1',
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
			name: 'Video Proc Amp - Set Black Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -30 to +30',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Proc Amp - Increase Black Value by 1',
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
			name: 'Video Proc Amp - Decrease Black Value by 1',
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
			name: 'Video Proc Amp - Set Saturation Gain Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -60 to +60',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Proc Amp - Increase Saturation Value by 1',
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
			name: 'Video Proc Amp - Decrease Saturation Value by 1',
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
			name: 'Video Proc Amp - Set Hue Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -179 to +180',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Proc Amp - Increase Hue Value by 1',
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
			name: 'Video Proc Amp - Decrease Hue Value by 1',
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
			name: 'Video Proc Amp - Set RY Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Proc Amp - Increase RY Value by 1',
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
			name: 'Video Proc Amp - Decrease RY Value by 1',
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
			name: 'Video Proc Amp - Set Amp BY Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -200 to +200',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Proc Amp - Increase BY Value by 1',
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
			name: 'Video Proc Amp - Decrease BY Value by 1',
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
			name: 'Video Proc Amp - Set Sharp Value',
			options: [
				{
					type: 'textinput',
					label: 'Value',
					id: 'value',
					default: '0',
					tooltip: 'Value between -50 to +50',
					useVariables: true,
				},
			],
			callback: async function (action, bank) {
				let value = parseInt(await self.parseVariablesInString(action.options.value))
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
			name: 'Video Proc Amp - Increase Sharp Value by 1',
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
			name: 'Video Proc Amp - Decrease Sharp Value by 1',
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
			name: 'Genlock - Increase Pixel Offset Value by X',
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
			name: 'Genlock - Decrease Pixel Offset Value by X',
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
			name: 'Genlock - Set Pixel Offset Value to Top of Range',
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
			name: 'Genlock - Set Pixel Offset Value to Bottom of Range',
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
			name: 'Genlock - Increase Line Offset Value by X',
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
			name: 'Genlock - Decrease Line Offset Value by X',
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
			name: 'Genlock - Set Line Offset Value to Top of Range',
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
			name: 'Genlock - Set Line Offset Value to Bottom of Range',
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
