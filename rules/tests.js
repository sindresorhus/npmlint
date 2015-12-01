'use strict';
var exec = require('child_process').exec;

module.exports = function (data, cb) {
	var pkg = data.pkg;

	if (!(pkg.scripts && pkg.scripts.test)) {
		cb(null, {
			name: 'package-test-property',
			severity: 'error',
			message: 'Missing property `scripts.test` in package.json.'
		});
		return;
	}

	if (pkg.scripts && /no test specified/.test(pkg.scripts.test)) {
		cb(null, {
			name: 'package-test-not-implemented',
			severity: 'error',
			message: 'Property `scripts.test` in package.json is not implemented.'
		});
		return;
	}

	if (pkg.scripts && pkg.scripts.test) {
		return exec('npm test', function (err) {
			if (!err) {
				cb();
				return;
			}

			cb(null, {
				name: 'package-test-fail',
				severity: 'error',
				message: 'Tests are failing.'
			});
		});
	}

	cb();
};
