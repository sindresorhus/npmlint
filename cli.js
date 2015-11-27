#!/usr/bin/env node
'use strict';
const sudoBlock = require('sudo-block');
const meow = require('meow');
const updateNotifier = require('update-notifier');
const getReporter = require('./get-reporter');
const npmlint = require('.');

const cli = meow(`
	Usage
	  $ npmlint

	Options
	  -r, --reporter  Custom reporter (json|tap|<node module>|<path>)
	  -v, --verbose   Verbose output
`, {
	string: ['_'],
	boolean: ['verbose'],
	alias: {
		v: '--verbose',
		r: '--reporter'
	}
});

sudoBlock();
updateNotifier({pkg: cli.pkg}).notify();

// TODO: support remote packages
// if (/\w+\/\w+/.test(cmd)) {
// 	download('https://api.github.com/repos/' + cmd + '/tarball', 'bar', {extract: true});
// 	request.get('https://api.github.com/repos/' + cmd + '/tarball', function () {
// 		init();
// 	});
// 	return;
// }

npmlint(null, result => {
	console.log(getReporter(cli.flags.reporter, cli.flags)(result, cli.flags));
});
