
var vm = require('vm');
var fs = require('fs');

function ContractDefinition(code) {
	var methods = {};
	var properties = [];
	
	var sandbox = {
		public: function (name, mth) { 
			if (typeof mth === 'function')
				methods[name] = mth;
			else
				properties.push(name);
		}
	};
	
	vm.createContext(sandbox);
	vm.runInContext(code, sandbox);
	
	this.instance = function (args, storage) {
		storage = storage || new Object();
		var contract = new Object();
		args = args || [];
		
		for (n in methods)
			contract[n] = methods[n];
	
		for (n in properties)
			defineProperty(storage, contract, properties[n]);

		Object.seal(contract);
			
		if (contract.initialize)
			contract.initialize.apply(contract, args);
		
		var outer = {};
		
		for (n in methods)
			defineMethod(contract, outer, n);
		
		for (n in properties)
			defineProperty(contract, outer, properties[n]);
		
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