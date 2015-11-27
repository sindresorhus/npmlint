'use strict';
const fs = require('fs');
const path = require('path');
const findup = require('findup-sync');
const async = require('async');

module.exports = (dir, cb) => {
	const pkgPath = findup('package.json', {cwd: dir || process.cwd()});
	const pkg = require(pkgPath);
	const cwd = path.dirname(pkgPath);
	const rulesPath = path.join(__dirname, 'rules');
	let ret = [];

	if (!pkgPath) {
		throw new Error('Couldn\'t find a package.json.');
	}

	async.each(fs.readdirSync(rulesPath), (file, next) => {
		if (path.extname(file) !== '.js') {
			next();
			return;
		}

		const rule = require(path.join(rulesPath, file));

		rule({cwd, pkg}, (err, result) => {
			if (result) {
				[].push.apply(ret, Array.isArray(result) ? result : [result]);
			}

			next(err);
		});
	}, err => {
		if (err) {
			cb(err);
			return;
		}

		ret = ret.sort((a, b) => {
			const severity = {
				info: 0,
				warn: 1,
				error: 2
			};

			return severity[a.severity] < severity[b.severity];
		});

		cb(ret);
	});
};
