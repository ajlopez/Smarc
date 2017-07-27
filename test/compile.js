
var smarc = require('..');

exports['compiles simple contract with definition'] = function (test) {
	var compiled = smarc.compile('function increment(x) { return x + 1; }; contract({ methods: { public: { increment: increment }}});');
	
	test.ok(compiled);
	test.equal(typeof compiled, 'object');
};

exports['create instance using contract with definition'] = function (test) {
	var compiled = smarc.compile('function increment(x) { return x + 1; }; contract({ methods: { public: { increment: increment }}});');
	var instance = compiled.instance();
	
	test.ok(instance);
	test.equal(typeof instance, 'object');
	test.equal(instance.increment(1), 2);
	test.equal(instance.increment(41), 42);
};

exports['sealed instance'] = function (test) {
	var compiled = smarc.compile('function increment(x) { return x + 1; }; contract({ methods: { public: { increment: increment }}});');
	var instance = compiled.instance();
	
	test.ok(instance);
	instance.name = "Adam";
	test.equal(instance.name, null);
};

exports['create instance calling constructor in contract definition'] = function (test) {
	var compiled = smarc.compile('function initialize(msg) { this.message = msg; }; contract({ constructor: initialize, properties: { public: [ "message" ]}});');
	var instance = compiled.instance(["hello"]);
	
	test.ok(instance);
	test.equal(typeof instance, 'object');
	test.equal(instance.message, "hello");
};

exports['accessing storage'] = function (test) {
	var compiled = smarc.compile('function initialize(msg) { this.message = msg; }; contract({ constructor: initialize, properties: { public: [ "message" ]}});');
	var storage = {};
	var instance = compiled.instance(["hello"], storage);
	
	test.ok(instance);
	test.equal(typeof instance, 'object');
	test.equal(instance.message, "hello");
	test.equal(storage.message, "hello");
};

exports['accessing storage private property'] = function (test) {
	var compiled = smarc.compile('function initialize(msg) { this.message = msg; }; contract({ constructor: initialize, properties: { private: [ "message" ]}});');
	var storage = {};
	var instance = compiled.instance(["hello"], storage);
	
	test.ok(instance);
	test.equal(typeof instance, 'object');
	test.equal(instance.message, null);
	test.equal(storage.message, "hello");
};



