
var vm = require('vm');
var fs = require('fs');

function ContractDefinition(code) {
	var methods = {};
	
	var sandbox = {
		public: function (name, mth) { methods[name] = mth; }
	};
	
	vm.createContext(sandbox);
	vm.runInContext(code, sandbox);
	
	this.instance = function () {
		var contract = new Object();
		
		for (n in methods)
			contract[n] = methods[n];
			
		if (contract.initialize)
			contract.initialize.apply(contract, arguments);
	
		Object.seal(contract);
		
		return contract;
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