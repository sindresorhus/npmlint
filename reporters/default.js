'use strict';
var chalk = require('chalk');

var severity = {
	info: chalk.white,
	warn: chalk.yellow,
	error: chalk.red
};

module.exports = function (messages, options) {
	if (messages.length === 0) {
		console.log(chalk.green('✔︎ Looking good!'));
		return;
	}

	return messages.map(function (el) {
		var name = options.verbose ? el.name + '\n' : '';
		return '\n' + chalk.gray(name) + severity[el.severity]('• ' + el.message) + '\n';
	}).join('');
};
