'use strict';
module.exports = function (data, cb) {
	var pkg = data.pkg;
	var ret = [];

	var recommendedProps = [
		'name',
		'version',
		'description',
		'keywords',
		'author',
		'main',
		'files',
		'repository',
		'engines'
	];

	var missingProps = recommendedProps.filter(function (el) {
		return !pkg[el];
	});

	if (!pkg.license && !pkg.licenses) {
		missingProps.push('license');
		ret.push({
			name: 'license-property',
			severity: 'warn',
			message: 'Specify a "license" in package.json so people know how they are permitted to use your package.'
		});
	}

	if (missingProps.length > 0) {
		ret.push({
			name: 'package-properties',
			severity: 'info',
			message: 'Missing recommended package.json properties:' +
				missingProps.map(function (el) {
					return '\n\t• ' + el;
				}).join('')
		});
	}

	cb(null, ret);
};
