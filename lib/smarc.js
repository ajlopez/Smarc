
var vm = require('vm');
var fs = require('fs');

function ContractDefinition(code) {
	var definition = null;
	var constructor;
	
	var sandbox = {
		contract: function (data) {
			definition = data;
		}
	};
	
	vm.createContext(sandbox);
	vm.runInContext(code, sandbox);
	
	definition = definition || {};
	definition.methods = definition.methods || {};
	definition.methods.public = definition.methods.public || {};
	definition.properties = definition.properties || {};
	definition.properties.public = definition.properties.public || [];
	
	this.instance = function (args, storage) {
		storage = storage || new Object();
		var contract = new Object();
		args = args || [];
		
		for (n in definition.methods.public)
			contract[n] = definition.methods.public[n];
	
		for (n in definition.properties.public)
			defineProperty(storage, contract, definition.properties.public[n]);

		Object.seal(contract);
			
		if (definition.constructor)
			definition.constructor.apply(contract, args);
		
		var outer = {};
		
		for (n in definition.methods.public)
			defineMethod(contract, outer, n);
		
		for (n in definition.properties.public)
			defineProperty(contract, outer, definition.properties.public[n]);
		
		Object.seal(outer);
		
		return outer;
	}
	
	function defineMethod(inner, outer, name) {
		function call() {
			return inner[name].apply(inner, arguments);
		}
		
		Object.defineProperty(outer, name, {
			get: function () { return call; }
		})
	}
	
	function defineProperty(inner, outer, name) {
		Object.defineProperty(outer, name, {
			get: function () { return inner[name]; },
			set: function (newvalue) { inner[name] = newvalue; }
		})
	}
}

function compileContract(code) {
	return new ContractDefinition(code);
}

function loadContract(filename) {
	var code = fs.readFileSync(filename).toString();
	return compileContract(code);
}

module.exports = {
	compile: compileContract,
	load: loadContract
}