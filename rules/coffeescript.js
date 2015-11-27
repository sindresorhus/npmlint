'use strict';
const glob = require('glob');

module.exports = (data, cb) => {
	const pkg = data.pkg;
	const ret = [];
	const csFiles = glob.sync('**/*.coffee', {cwd: data.cwd}).length;

	if (csFiles && !(pkg.scripts && pkg.scripts.prepublish)) {
		ret.push({
			name: 'coffeescript-prepublish',
			severity: 'error',
			message: 'Compile your CoffeScript before publishing using `scripts.prepublish` in package.json.\n\tSee: https://npmjs.org/doc/misc/npm-scripts.html'
		});
	}

	if (pkg.dependencies['coffee-script']) {
		ret.push({
			name: 'coffeescript-dependency',
			severity: 'warn',
			message: '`coffee-script` should be a `devDependency` and not a `dependency`. Compile your CoffeScript before publishing using `scripts.prepublish` in package.json.\n\tSee: https://npmjs.org/doc/misc/npm-scripts.html'
		});
	}

	cb(null, ret);
};
