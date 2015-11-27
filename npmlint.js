'use strict';
var fs = require('fs');
var path = require('path');
var findup = require('findup-sync');
var async = require('async');

module.exports = function (dir, cb) {
	var pkgPath = findup('package.json', {cwd: dir || process.cwd()});
	var pkg = require(pkgPath);
	var cwd = path.dirname(pkgPath);
	var rulesPath = path.join(__dirname, 'rules');
	var ret = [];

	if (!pkgPath) {
		throw new Error('Couldn\'t find a package.json.');
	}

	async.each(fs.readdirSync(rulesPath), function (file, next) {
		if (path.extname(file) !== '.js') {
			return next();
		}

		var rule = require(path.join(rulesPath, file));

		rule({cwd: cwd, pkg: pkg}, function (err, result) {
			if (result) {
				[].push.apply(ret, Array.isArray(result) ? result : [result]);
			}

			next(err);
		});
	}, function (err) {
		if (err) {
			return err;
		}

		ret = ret.sort(function (a, b) {
			var severity = {
				info: 0,
				warn: 1,
				error: 2
			};

			return severity[a.severity] < severity[b.severity];
		})

		cb(ret);
	});
};
