
var smarc = require('..');

exports['compiles simple contract'] = function (test) {
	var compiled = smarc.compile('method("increment", function (x) { return x + 1; })');
	
	test.ok(compiled);
	test.equal(typeof compiled, 'object');
};

exports['create instance'] = function (test) {
	var compiled = smarc.compile('method("increment", function (x) { return x + 1; })');
	var instance = compiled.instance();
	
	test.ok(instance);
	test.equal(typeof instance, 'object');
	test.equal(instance.increment(1), 2);
	test.equal(instance.increment(41), 42);
};

exports['create instance calling initialize'] = function (test) {
	var compiled = smarc.compile('method("initialize", function (msg) { this.message = msg; })');
	var instance = compiled.instance("hello");
	
	test.ok(instance);
	test.equal(typeof instance, 'object');
	test.equal(instance.message, "hello");
};



