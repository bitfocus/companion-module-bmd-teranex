// BlackMagic Design Teranex

const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const UpgradeScripts = require('./src/upgrades')

const config = require('./src/config')
const actions = require('./src/actions')
const feedbacks = require('./src/feedbacks')
const variables = require('./src/variables')
const presets = require('./src/presets')

const utils = require('./src/utils')
const choices = require('./src/choices')

class teranexInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...config,
			...actions,
			...feedbacks,
			...variables,
			...presets,
			...utils,
			...choices,
		})

		this.data = {
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
				aspect_fill_cr: 512,
			},
			video_procamp: {
				gain: 0,
				black: 0,
				saturation: 0,
				hue: 0,
				ry: 0,
				by: 0,
				sharp: 0,
			},
			genlock: {
				type: '',
				reference: '',
				lineoffset: 1,
				pixeloffset: 0,
				signallocked: '',
			},
			noiseReduction: {
				enabled: false,
				bias: 0,
				splitScreen: false,
				redOverlay: false
			},
			videoAdvanced: {
				cleanCadence: false,
				sceneCutDetect: false,
				sourecType: '',
				frcAperture: 0,
				processing: ''
			},
			variableAspectRatio: {
				sizeXLeft: 0,
				sizeXRight: 0,
				sizeYLeft: 0,
				sizeYRight: 0,
				posXLeft: 0,
				posXRight: 0,
				posYLeft: 0,
				posYRight: 0,
				trimXLeft: 0,
				trimXRight: 0,
				trimYLeft: 0,
				trimYRight: 0,
				zoomCrop: 0,
			}
		}

		this.stash = []
		this.command = null
	}

	async destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy()
		}
		this.killKeepAlive()
	}

	async init(config) {
		this.configUpdated(config)
	}

	async configUpdated(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Connecting)

		this.initActions()
		this.initFeedbacks()
		this.initVariables()
		this.initPresets()

		this.initTCP()
	}
}

runEntrypoint(teranexInstance, UpgradeScripts)
