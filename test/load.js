
var smarc = require('..');
var path = require('path');

exports['load simple contract'] = function (test) {
	var compiled = smarc.load(path.join(__dirname, 'token.sc'));
	
	test.ok(compiled);
	test.equal(typeof compiled, 'object');
};

exports['create instance'] = function (test) {
	var compiled = smarc.load(path.join(__dirname, 'token.sc'));
	var instance = compiled.instance();
	
	test.ok(instance);
	instance.transfer('account1', 1000);
	instance.transfer('account2', 2000);
	test.equal(instance.getBalance('account1'), 1000);
	test.equal(instance.getBalance('account2'), 2000);
	test.equal(instance.getBalance('account3'), null);
};

