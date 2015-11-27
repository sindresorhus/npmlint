'use strict';
var yamlish = require('yamlish');

module.exports = function (messages) {
	var ret = '\nTAP version 13\n';
	var total = 0;

	ret += messages.map(function (el) {
		return 'not ok ' + ++total + '\n    ---' + yamlish.encode({
			name: el.name,
			severity: el.severity,
			message: el.message
		}) + '\n    ...\n';
	}).join('\n') + '\n';

	ret += '1..' + total;

	return ret;
};
