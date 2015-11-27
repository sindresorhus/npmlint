'use strict';
const fs = require('fs');
const path = require('path');
const resolve = require('resolve');

module.exports = (reporter, opts) => {
	if (!reporter) {
		return require('./reporters/default');
	}

	// cwd file
	if (fs.existsSync(reporter)) {
		return require(path.resolve(reporter));
	}

	// cwd node module
	try {
		return require(resolve.sync(reporter, {basedir: process.cwd()}));
	} catch (err) {
		if (!/Cannot find module/.test(err)) {
			throw err;
		}
	}

	// file
	try {
		return require(`./reporters/${reporter}`);
	} catch (err) {
		if (err.code !== 'MODULE_NOT_FOUND') {
			throw err;
		}
	}

	if (opts.verbose) {
		console.error(`Couldn't find custom reporter. Falling back to default.`);
	}
};
