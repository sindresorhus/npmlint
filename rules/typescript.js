'use strict';
var glob = require('glob');

module.exports = function (data, cb) {
	var pkg = data.pkg;
	var ret = [];
	var tsFiles = glob.sync('**/*.ts', {cwd: data.cwd}).length;

	if (tsFiles && !(pkg.scripts && pkg.scripts.prepublish)) {
		ret.push({
			name: 'typescript-prepublish',
			severity: 'error',
			message: 'Compile your TypeScript before publishing using `scripts.prepublish` in package.json.\n\tSee: https://npmjs.org/doc/misc/npm-scripts.html'
		});
	}

	if (pkg.dependencies.typescript) {
		ret.push({
			name: 'typescript-dependency',
			severity: 'warn',
			message: '`typescript` should be a `devDependency` and not a `dependency`. Compile your TypeScript before publishing using `scripts.prepublish` in package.json.\n\tSee: https://npmjs.org/doc/misc/npm-scripts.html'
		});
	}

	cb(null, ret);
};
