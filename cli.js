#!/usr/bin/env node
'use strict';
var sudoBlock = require('sudo-block');
var notifier = require('update-notifier')();
var chalk = require('chalk');
var nopt = require('nopt');
// var request = require('request');
// var tmp = require('tmp');
var download = require('download');
var npmlint = require('./npmlint');
var getReporter = require('./get-reporter');
var pkg = require('./package');

var opts = nopt({
	help: Boolean,
	version: Boolean,
	verbose: Boolean,
	reporter: String
}, {
	h: '--help',
	v: '--version',
	V: '--verbose',
	r: '--reporter'
});

var args = opts.argv.remain;
var cmd = args[0];


function init() {
	npmlint(null, function (result) {
		process.stdout.write(getReporter(opts.reporter, opts)(result, opts));
	});
}

sudoBlock();

if (opts.version) {
	console.log(pkg.version);
	return;
}

if (opts.help) {
	console.log('\nUsage: ' + chalk.blue('npmlint') + ' ' + chalk.gray('[github-user/repo]') + '\n\nOptions:\n-r\t--reporter\tCustom reporter (<path>|<node module>|json|tap)\n-V\t--verbose\tVerbose output');
	return;
}

if (notifier.update) {
	notifier.notify(true);
}

if (/\w+\/\w+/.test(cmd)) {
	//todo
	download('https://api.github.com/repos/' + cmd + '/tarball', 'bar', {extract: true});
	/*request.get('https://api.github.com/repos/' + cmd + '/tarball', function () {
		init();
	});*/
	return;
}

init();
