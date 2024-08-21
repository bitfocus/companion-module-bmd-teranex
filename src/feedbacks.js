const { combineRgb } = require('@companion-module/base')

module.exports = {
	initFeedbacks: function () {
		let self = this
		let feedbacks = {}

		const foregroundColor = combineRgb(255, 255, 255) // White
		const backgroundColorRed = combineRgb(255, 0, 0) // Red

		feedbacks.input_bg = {
			type: 'boolean',
			name: 'Video input: Change background color',
			description: 'If the input specified is the active video input, change colors of the bank',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Input',
					id: 'input',
					default: 'SDI1',
					choices: self.video_sources,
				},
			],
			callback: async function (feedback, bank) {
				if (self.video_source === feedback.options.input) {
					return true
				}

				return false
			},
		}

		feedbacks.audio_bg = {
			type: 'boolean',
			name: 'Audio input: Change background color',
			description: 'If the input specified is the active audio input, change colors of the bank',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Input',
					id: 'input',
					default: 'Embedded',
					choices: self.audio_sources,
				},
			],
			callback: async function (feedback, bank) {
				if (self.audio_source === feedback.options.input) {
					return true
				}

				return false
			},
		}

		feedbacks.signal_present = {
			type: 'boolean',
			name: 'Signal is present',
			description: 'Change colors of bank if the signal is present',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: async function (feedback, bank) {
				if (self.signal_present === 'true') {
					return true
				}

				return false
			},
		}

		//Noise Reduction Feedbacks
		feedbacks.noise_reduction_enabled = {
			type: 'boolean',
			label: 'Noise Reduction Enabled',
			description: 'Change colors of bank if Noise Reduction is enabled',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: async function (feedback, bank) {
				if (self.data.noiseReduction?.enabled) {
					return true
				}

				return false
			},
		}

		feedbacks.noise_reduction_splitscreen_enabled = {
			type: 'boolean',
			label: 'Noise Reduction Split Screen Enabled',
			description: 'Change colors of bank if Noise Reduction Split screen is enabled',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: async function (feedback, bank) {
				if (self.data.noiseReduction?.splitscreen) {
					return true
				}

				return false
			},
		}

		feedbacks.noise_reduction_redoverlay_enabled = {
			type: 'boolean',
			label: 'Noise Reduction Red Overlay Enabled',
			description: 'Change colors of bank if Noise Reduction Red overlay is enabled',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: async function (feedback, bank) {
				if (self.data.noiseReduction?.redoverlay) {
					return true
				}

				return false
			},
		}

		//Video Advanced Feedbacks
		feedbacks.videoadvanced_cleancadence = {
			type: 'boolean',
			label: 'Video Advanced Clean Cadence',
			description: 'Change colors of bank if Clean Cadence is enabled',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: async function (feedback, bank) {
				if (self.data.videoAdvanced?.cleanCadence) {
					return true
				}

				return false
			},
		}

		feedbacks.videoadvanced_scenecutdetect = {
			type: 'boolean',
			label: 'Video Advanced Scenecut Detect',
			description: 'Change colors of bank if Scenecut Detect is enabled',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: async function (feedback, bank) {
				if (self.data.videoAdvanced?.scenecutDetect) {
					return true
				}

				return false
			},
		}

		feedbacks.videoadvanced_sourcetype = {
			type: 'boolean',
			label: 'Video Advanced Source Type',
			description: 'Change colors of bank if Source Type is enabled',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [],
			callback: async function (feedback, bank) {
				if (self.data.videoAdvanced?.sourceType) {
					return true
				}

				return false
			},
		}

		feedbacks.videoadvanced_frcaperture = {
			type: 'boolean',
			label: 'Video Advanced FRC Aperture',
			description: 'Change colors of bank if FRC Aperture value is X',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'textinput',
					label: 'FRC Aperture',
					id: 'frcAperture',
					default: '0',
					choices: [
						{ id: '0', label: '0' },
						{ id: '1', label: '1' },
						{ id: '2', label: '2' },
						{ id: '3', label: '3' },
					],
				},
			],
			callback: async function (feedback, bank) {
				if (parseInt(self.data.videoAdvanced?.frcAperture) === parseInt(feedback.options.frcAperture)) {
					return true
				}

				return false
			},
		}

		feedbacks.videoadvanced_processing = {
			type: 'boolean',
			label: 'Video Advanced Processing',
			description: 'Change colors of bank if Processing is X mode',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
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
			callback: async function (feedback, bank) {
				if (self.data.videoAdvanced?.processing === feedback.options.processing) {
					return true
				}

				return false
			},
		}

		self.setFeedbackDefinitions(feedbacks)
	},
}
