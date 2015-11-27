'use strict';
const chalk = require('chalk');

const severity = {
	info: chalk.white,
	warn: chalk.yellow,
	error: chalk.red
};

module.exports = (messages, opts) => {
	if (messages.length === 0) {
		console.log(chalk.green('✔︎ Looking good!'));
		return null;
	}

	return messages.map(el => {
		const name = opts.verbose ? `${el.name}\n` : '';
		const msg = severity[el.severity](`• ${el.message}`);
		return `\n${chalk.gray(name)}${msg}\n`;
	}).join('');
};
