const { combineRgb } = require('@companion-module/base')

module.exports = {
	initPresets: function () {
		let self = this
		let presets = []

		const foregroundColor = combineRgb(255, 255, 255) // White
		const foregroundColorBlack = combineRgb(0, 0, 0) // Black
		const backgroundColorRed = combineRgb(255, 0, 0) // Red
		const backgroundColorGreen = combineRgb(0, 255, 0) // Green
		const backgroundColorOrange = combineRgb(255, 102, 0) // Orange

		// Video
		for (let i = 0; i < self.video_sources.length; ++i) {
			let input = self.video_sources[i].id
			presets.push({
				type: 'button',
				category: 'Video',
				name: 'Change video input to ' + input,
				style: {
					text: input,
					size: 'auto',
					color: '16777215',
					bgcolor: 0,
				},
				steps: [
					{
						down: [
							{
								actionId: 'set_input',
								options: {
									source: input,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'input_bg',
						options: {
							input: input,
						},
					},
				],
			})
		}

		// Audio
		for (let i = 0; i < self.audio_sources.length; ++i) {
			let input = self.audio_sources[i].id
			presets.push({
				type: 'button',
				category: 'Audio',
				name: 'Change audio input to ' + input,
				style: {
					text: input,
					size: 'auto',
					color: '16777215',
					bgcolor: 0,
				},
				steps: [
					{
						down: [
							{
								actionId: 'set_audio',
								options: {
									source: input,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'audio_bg',
						options: {
							input: input,
						},
					},
				],
			})
		}

		// Signal present
		presets.push({
			type: 'button',
			category: 'Status',
			name: 'Show signal status',
			style: {
				text: '$(teranex:input_format)',
				size: 'auto',
				color: '16777215',
				bgcolor: combineRgb(255, 0, 0),
			},
			steps: [],
			feedbacks: [
				{
					feedbackId: 'signal_present',
					options: {},
				},
			],
		})

		self.setPresetDefinitions(presets)
	},
}
