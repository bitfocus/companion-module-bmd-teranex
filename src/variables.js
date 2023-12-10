module.exports = {
	initVariables: function () {
		let self = this
		let variables = []

		variables.push({ name: 'Connection Status', variableId: 'connect_status' })

		variables.push({ name: 'Input video format', variableId: 'input_format' })
		variables.push({ name: 'Selected video input', variableId: 'video_input' })
		variables.push({ name: 'Selected audio input', variableId: 'audio_input' })
		variables.push({ name: 'Selected video output', variableId: 'output_format' })

		variables.push({ name: 'Video Adjust Red', variableId: 'video_adjust_red' })
		variables.push({ name: 'Video Adjust Green', variableId: 'video_adjust_green' })
		variables.push({ name: 'Video Adjust Blue', variableId: 'video_adjust_blue' })
		variables.push({ name: 'Video Adjust Luma Low', variableId: 'video_adjust_luma_low' })
		variables.push({ name: 'Video Adjust Luma High', variableId: 'video_adjust_luma_high' })
		variables.push({ name: 'Video Adjust Chroma Low', variableId: 'video_adjust_chroma_low' })
		variables.push({ name: 'Video Adjust Chroma High', variableId: 'video_adjust_chroma_high' })
		variables.push({ name: 'Video Adjust Aspect Fill Luma', variableId: 'video_adjust_aspect_fill_luma' })
		variables.push({ name: 'Video Adjust Aspect Fill Cb', variableId: 'video_adjust_aspect_fill_cb' })
		variables.push({ name: 'Video Adjust Aspect Fill Cr', variableId: 'video_adjust_aspect_fill_cr' })

		variables.push({ name: 'Video Proc Amp Gain', variableId: 'video_procamp_gain' })
		variables.push({ name: 'Video Proc Amp Black', variableId: 'video_procamp_black' })
		variables.push({ name: 'Video Proc Amp Saturation', variableId: 'video_procamp_saturation' })
		variables.push({ name: 'Video Proc Amp Hue', variableId: 'video_procamp_hue' })
		variables.push({ name: 'Video Proc Amp RY', variableId: 'video_procamp_ry' })
		variables.push({ name: 'Video Proc Amp BY', variableId: 'video_procamp_by' })
		variables.push({ name: 'Video Proc Amp Sharp', variableId: 'video_procamp_sharp' })

		variables.push({ name: 'Genlock Reference', variableId: 'genlock_reference' })
		variables.push({ name: 'Genlock Pixel Offset', variableId: 'genlock_pixeloffset' })
		variables.push({ name: 'Genlock Line Offset', variableId: 'genlock_lineoffset' })
		variables.push({ name: 'Genlock Signal Locked', variableId: 'genlock_signallocked' })
		variables.push({ name: 'Genlock Type', variableId: 'genlock_type' })

		self.setVariableDefinitions(variables)
	},

	checkVariables: function () {
		let self = this

		try {
			let variableObj = {}

			variableObj.input_format = self.input_format
			variableObj.video_input = self.video_source
			variableObj.audio_input = self.audio_source
			variableObj.output_format = self.output_format

			variableObj.video_adjust_red = self.data.video_adjust.red
			variableObj.video_adjust_green = self.data.video_adjust.green
			variableObj.video_adjust_blue = self.data.video_adjust.blue
			variableObj.video_adjust_luma_low = self.data.video_adjust.luma_low
			variableObj.video_adjust_luma_high = self.data.video_adjust.luma_high
			variableObj.video_adjust_chroma_low = self.data.video_adjust.chroma_low
			variableObj.video_adjust_chroma_high = self.data.video_adjust.chroma_high
			variableObj.video_adjust_aspect_fill_luma = self.data.video_adjust.aspect_fill_luma
			variableObj.video_adjust_aspect_fill_cb = self.data.video_adjust.aspect_fill_cb
			variableObj.video_adjust_aspect_fill_cr = self.data.video_adjust.aspect_fill_cr

			variableObj.video_procamp_gain = self.data.video_procamp.gain
			variableObj.video_procamp_black = self.data.video_procamp.black
			variableObj.video_procamp_saturation = self.data.video_procamp.saturation
			variableObj.video_procamp_hue = self.data.video_procamp.hue
			variableObj.video_procamp_ry = self.data.video_procamp.ry
			variableObj.video_procamp_by = self.data.video_procamp.by
			variableObj.video_procamp_sharp = self.data.video_procamp.sharp

			variableObj.genlock_reference = self.data.genlock.reference
			variableObj.genlock_pixeloffset = self.data.genlock.pixeloffset
			variableObj.genlock_lineoffset = self.data.genlock.lineoffset
			variableObj.genlock_signallocked = self.data.genlock.signallocked
			variableObj.genlock_type = self.data.genlock.type

			self.setVariableValues(variableObj)
		} catch (error) {
			self.log('error', 'Error parsing Variables: ' + String(error))
		}
	},
}
