const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module will connect to a Blackmagic Design Teranex Device.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'IP',
				width: 4,
				regex: Regex.IP,
			},
			{
				type: 'checkbox',
				id: 'debug',
				width: 1,
				label: 'Enable',
				default: false,
			},
			{
				type: 'static-text',
				id: 'debugInfo',
				width: 11,
				label: 'Enable Debug To Log Window',
				value:
					'This will allow you the see what is being sent from the module and what is being received from the device.',
			},
		]
	},
}
