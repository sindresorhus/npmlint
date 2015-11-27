'use strict';
const semver = require('semver');

module.exports = (data, cb) => {
	if (!semver.valid(data.pkg.version)) {
		cb(null, {
			name: 'valid-version',
			severity: 'error',
			message: 'The specified `version` in package.json is invalid.\n\tSee: https://github.com/isaacs/node-semver'
		});
		return;
	}

	cb();
};
