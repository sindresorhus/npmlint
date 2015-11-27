'use strict';
var fs = require('fs');
var path = require('path');
var resolve = require('resolve');

module.exports = function (reporter, options) {
	if (reporter) {
		// cwd file
		if (fs.existsSync(reporter)) {
			return require(path.join(process.cwd(), reporter));
		}

		// cwd node module
		try {
			return require(resolve.sync(reporter, {basedir: process.cwd()}));
		} catch (e) {
			if (!/Cannot find module/.test(e)) {
				throw e;
			}
		}

		// file
		try {
			return require('./reporters/' + reporter);
		} catch (e) {
			if (e.code !== 'MODULE_NOT_FOUND') {
				throw e;
			}
		}

		if (options.verbose) {
			console.error('Couldn\'t find custom reporter. Falling back to default.');
		}
	}

	return require('./reporters/default');
};
