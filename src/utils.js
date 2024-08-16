const { TCPHelper, InstanceStatus } = require('@companion-module/base')
const keep_alive_value = 60000

module.exports = {
	initTCP: function () {
		let self = this
		let receivebuffer = ''

		if (self.socket !== undefined) {
			self.setVariableValues({ connect_status: 'Disconnected' })
			self.socket.destroy()
			delete self.socket
		}

		if (self.config.port === undefined) {
			self.config.port = 9800
		}

		self.has_data = false

		if (self.config.host) {
			self.socket = new TCPHelper(self.config.host, self.config.port)

			self.socket.on('error', function (err) {
				self.log('error', 'Network error: ' + err.message)
				self.socket.destroy()
				delete self.socket
				self.setVariableValues({ connect_status: 'Disconnected' })
				self.log('info', 'Retrying connection in 10 seconds...')
				setTimeout(self.initTCP.bind(self), 10000) //retry after 10 seconds
				self.killKeepAlive()
			})

			self.socket.on('connect', function () {
				self.setVariableValues({ connect_status: 'Connected' })
				self.updateStatus(InstanceStatus.Ok)
				self.startKeepAlive()
			})

			// separate buffered stream into lines with responses
			self.socket.on('data', function (chunk) {
				let i = 0,
					line = '',
					offset = 0
				receivebuffer += chunk

				while ((i = receivebuffer.indexOf('\n', offset)) !== -1) {
					line = receivebuffer.substr(offset, i - offset)
					offset = i + 1
					self.socket.emit('receiveline', line.toString())
				}

				receivebuffer = receivebuffer.substr(offset)
			})

			self.socket.on('receiveline', function (line) {
				if (self.command === null && line.match(/:/)) {
					self.command = line
				} else if (self.command !== null && line.length > 0) {
					self.stash.push(line.trim())
				} else if (line.length === 0 && self.command !== null) {
					let cmd = self.command.trim().split(/:/)[0]

					if (self.config.debug) {
						self.log('debug', 'COMMAND: ' + cmd)
					}

					let obj = {}
					self.stash.forEach(function (val) {
						let info = val.split(/\s*:\s*/)
						obj[info.shift()] = info.join(':')
					})

					self.teranexInformation(cmd, obj)

					self.stash = []
					self.command = null
				} else {
					if (self.config.debug) {
						if (line == 'ACK') {
							self.log('debug', 'ACK recieved from Teranex')
						} else if (line == '') {
							self.log('debug', 'Empty line recieved from Teranex')
						} else {
							self.log('debug', 'Unexpected response from Teranex: ' + line)
						}
					}
				}
			})
		}
	},

	sendCommand: function (cmd) {
		let self = this

		if (self.socket !== undefined && self.socket.isConnected) {
			if (self.config.debug) {
				self.log('debug', 'SENDING COMMAND: ' + cmd)
			}
			self.socket.send(cmd)
			self.startKeepAlive()
		} else {
			self.log('error', 'Socket not connected :(')
		}
	},

	teranexInformation: function (key, data) {
		let self = this

		if (key == 'VIDEO INPUT') {
			if (self.config.debug) {
				self.log('debug', 'VIDEO INPUT DATA: ' + data)
			}

			if (data['Video source'] !== undefined) {
				self.video_source = data['Video source']
			}

			if (data['Audio source'] !== undefined) {
				self.audio_source = data['Audio source']
			}

			if (data['Video mode'] !== undefined) {
				self.input_format = data['Video mode']
			}

			if (data['Signal present'] !== undefined) {
				self.signal_present = data['Signal present']
			}
		}

		if (key == 'VIDEO OUTPUT') {
			if (self.config.debug) {
				self.log('debug', 'VIDEO OUTPUT DATA: ' + data)
			}

			if (data['Video mode'] !== undefined) {
				self.output_format = data['Video mode']
			}
		}

		if (key == 'VIDEO ADJUST') {
			if (self.config.debug) {
				self.log('debug', 'VIDEO ADJUST DATA: ' + data)
			}

			if (data['Red'] !== undefined) {
				self.data.video_adjust.red = parseInt(data['Red'])
			}

			if (data['Green'] !== undefined) {
				self.data.video_adjust.green = parseInt(data['Green'])
			}

			if (data['Blue'] !== undefined) {
				self.data.video_adjust.blue = parseInt(data['Blue'])
			}

			if (data['Luma low'] !== undefined) {
				self.data.video_adjust.luma_low = parseInt(data['Luma low'])
			}

			if (data['Luma high'] !== undefined) {
				self.data.video_adjust.luma_high = parseInt(data['Luma high'])
			}

			if (data['Chroma low'] !== undefined) {
				self.data.video_adjust.chroma_low = parseInt(data['Chroma low'])
			}

			if (data['Chroma high'] !== undefined) {
				self.data.video_adjust.chroma_high = parseInt(data['Chroma high'])
			}

			if (data['Aspect fill luma'] !== undefined) {
				self.data.video_adjust.aspect_fill_luma = parseInt(data['Aspect fill luma'])
			}

			if (data['Aspect fill Cb'] !== undefined) {
				self.data.video_adjust.aspect_fill_cb = parseInt(data['Aspect fill Cb'])
			}

			if (data['Aspect fill Cr'] !== undefined) {
				self.data.video_adjust.aspect_fill_cr = parseInt(data['Aspect fill Cr'])
			}
		}

		if (key == 'VIDEO PROC AMP') {
			if (self.config.debug) {
				self.log('debug', 'VIDEO PROC AMP DATA: ' + data)
			}

			if (data['Gain'] !== undefined) {
				self.data.video_procamp.gain = parseInt(data['Gain'])
			}

			if (data['Black'] !== undefined) {
				self.data.video_procamp.black = parseInt(data['Black'])
			}

			if (data['Saturation'] !== undefined) {
				self.data.video_procamp.saturation = parseInt(data['Saturation'])
			}

			if (data['Hue'] !== undefined) {
				self.data.video_procamp.hue = parseInt(data['Hue'])
			}

			if (data['RY'] !== undefined) {
				self.data.video_procamp.ry = parseInt(data['RY'])
			}

			if (data['BY'] !== undefined) {
				self.data.video_procamp.by = parseInt(data['BY'])
			}

			if (data['Sharp'] !== undefined) {
				self.data.video_procamp.sharp = parseInt(data['Sharp'])
			}
		}

		if (key == 'GENLOCK') {
			if (self.config.debug) {
				self.log('debug', 'GENLOCK DATA: ' + data)
			}

			if (data['Gen reference'] !== undefined) {
				self.data.genlock.reference = data['Gen reference']
			}

			if (data['Line offset'] !== undefined) {
				self.data.genlock.lineoffset = parseInt(data['Line offset'])
			}

			if (data['Pixel offset'] !== undefined) {
				self.data.genlock.pixeloffset = parseInt(data['Pixel offset'])
			}

			if (data['Signal locked'] !== undefined) {
				self.data.genlock.signallocked = data['Signal locked']
			}

			if (data['Type'] !== undefined) {
				self.data.genlock.type = data['Type']
			}
		}

		if (key == 'NOISE REDUCTION') {
			if (self.config.debug) {
				self.log('debug', 'NOISE REDUCTION DATA: ' + data)
			}

			if (data['Enabled'] !== undefined) {
				self.data.noiseReduction.enabled = data['Enabled'] == 'ON' ? true : false
			}

			if (data['Bias'] !== undefined) {
				self.data.noiseReduction.bias = parseFloat(data['Bias'])
			}

			if (data['Split screen'] !== undefined) {
				self.data.noiseReduction.splitScreen = data['Split screen'] == 'ON' ? true : false
			}

			if (data['Red overlay'] !== undefined) {
				self.data.noiseReduction.redOverlay = data['Red overlay'] == 'ON' ? true : false
			}
		}

		if (key == 'VIDEO ADVANCED') {
			if (self.config.debug) {
				self.log('debug', 'VIDEO ADVANCED DATA: ' + data)
			}

			if (data['Clean cadence'] !== undefined) {
				self.data.videoAdvanced.cleanCadence = data['Clean cadence'] == 'ON' ? true : false
			}

			if (data['Scenecut detect'] !== undefined) {
				self.data.videoAdvanced.sceneCutDetect = data['Scenecut detect'] == 'ON' ? true : false
			}

			if (data['Source type'] !== undefined) {
				self.data.videoAdvanced.sourceType = data['Source type']
			}

			if (data['FRC aperture'] !== undefined) {
				self.data.videoAdvanced.frcAperture = parseInt(data['FRC aperture'])
			}

			if (data['Processing'] !== undefined) {
				self.data.videoAdvanced.processing = data['Processing']
			}
		}

		if (key == 'VARIABLE ASPECT RATIO') {
			if (self.config.debug) {
				self.log('debug', 'VARIABLE ASPECT RATIO DATA: ' + data)
			}

			if (data['Variable Aspect Ratio size X left'] !== undefined) {
				self.data.variableAspectRatio.sizeXLeft = parseInt(data['Variable Aspect Ratio size X left'])
			}

			if (data['Variable Aspect Ratio size X right'] !== undefined) {
				self.data.variableAspectRatio.sizeXRight = parseInt(data['Variable Aspect Ratio size X right'])
			}

			if (data['Variable Aspect Ratio size Y left'] !== undefined) {
				self.data.variableAspectRatio.sizeYLeft = parseInt(data['Variable Aspect Ratio size Y left'])
			}

			if (data['Variable Aspect Ratio size Y right'] !== undefined) {
				self.data.variableAspectRatio.sizeYRight = parseInt(data['Variable Aspect Ratio size Y right'])
			}

			if (data['Variable Aspect Ratio pos X left'] !== undefined) {
				self.data.variableAspectRatio.posXLeft = parseInt(data['Variable Aspect Ratio pos X left'])
			}

			if (data['Variable Aspect Ratio pos X right'] !== undefined) {
				self.data.variableAspectRatio.posXRight = parseInt(data['Variable Aspect Ratio pos X right'])
			}

			if (data['Variable Aspect Ratio pos Y left'] !== undefined) {
				self.data.variableAspectRatio.posYLeft = parseInt(data['Variable Aspect Ratio pos Y left'])
			}

			if (data['Variable Aspect Ratio pos Y right'] !== undefined) {
				self.data.variableAspectRatio.posYRight = parseInt(data['Variable Aspect Ratio pos Y right'])
			}

			if (data['Variable Aspect Ratio trim X left'] !== undefined) {
				self.data.variableAspectRatio.trimXLeft = parseInt(data['Variable Aspect Ratio trim X left'])
			}

			if (data['Variable Aspect Ratio trim X right'] !== undefined) {
				self.data.variableAspectRatio.trimXRight = parseInt(data['Variable Aspect Ratio trim X right'])
			}

			if (data['Variable Aspect Ratio trim Y left'] !== undefined) {
				self.data.variableAspectRatio.trimYLeft = parseInt(data['Variable Aspect Ratio trim Y left'])
			}

			if (data['Variable Aspect Ratio trim Y right'] !== undefined) {
				self.data.variableAspectRatio.trimYRight = parseInt(data['Variable Aspect Ratio trim Y right'])
			}

			if (data['Variable Aspect Ratio zoom/crop'] !== undefined) {
				self.data.variableAspectRatio.zoomCrop = parseInt(data['Variable Aspect Ratio zoom/crop'])
			}
		}

		self.checkFeedbacks()
		self.checkVariables()
	},

	keepAlive() {
		let self = this

		self.sendCommand('PING\n\n')
		self.keep_alive_timer = setTimeout(() => {
			self.keepAlive()
		}, keep_alive_value)
	},

	killKeepAlive() {
		let self = this

		if (self.keep_alive_timer) {
			clearTimeout(self.keep_alive_timer)
			delete self.keep_alive_timer
		}
	},

	startKeepAlive() {
		let self = this

		self.killKeepAlive()
		self.keep_alive_timer = {}
		self.keep_alive_timer = setTimeout(() => {
			this.keepAlive()
		}, keep_alive_value)
	},
}
