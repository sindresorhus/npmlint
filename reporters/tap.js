'use strict';
const yamlish = require('yamlish');

module.exports = messages => {
	let ret = '\nTAP version 13\n';
	let total = 0;

	ret += messages.map(x => {
		const yaml = yamlish.encode({
			name: x.name,
			severity: x.severity,
			message: x.message
		}).join('\n');

		return `not ok ${++total}\n    ---${yaml}\n`;
	});

	ret += `1..${total}`;

	return ret;
};
