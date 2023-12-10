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

		self.setFeedbackDefinitions(feedbacks)
	},
}
