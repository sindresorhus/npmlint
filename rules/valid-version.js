'use strict';
var semver = require('semver');

module.exports = function (data, cb) {
	if (!semver.valid(data.pkg.version)) {
		return cb(null, {
			name: 'valid-version',
			severity: 'error',
			message: 'The specified `version` in package.json is invalid.\n\tSee: https://github.com/isaacs/node-semver'
		});
	}

	cb();
};
