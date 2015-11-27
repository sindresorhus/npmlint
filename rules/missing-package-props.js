/* eslint-disable prefer-template */
'use strict';
module.exports = (data, cb) => {
	const pkg = data.pkg;
	const ret = [];

	const recommendedProps = [
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

	const missingProps = recommendedProps.filter(x => !pkg[x]);

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
				missingProps.map(x => `\n\t• ${x}`).join('')
		});
	}

	cb(null, ret);
};
