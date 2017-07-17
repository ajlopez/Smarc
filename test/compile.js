
var smarc = require('..');

exports['compiles simple contract'] = function (test) {
	var compiled = smarc.compile('method("increment", function (x) { return x + 1 }');
	
	test.ok(compiled);
	test.equal(typeof compiled, 'object');
};

