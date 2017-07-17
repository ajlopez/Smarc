
var vm = require('vm');

function ContractDefinition(code) {
	var methods = {};
	
	var sandbox = {
		method: function (name, mth) { methods[name] = mth; }
	};
	
	vm.createContext(sandbox);
	vm.runInContext(code, sandbox);
	
	this.instance = function () {
		var contract = new Object();
		
		for (n in methods)
			contract[n] = methods[n];
			
		if (contract.initialize)
			contract.initialize.apply(contract, arguments);
			
		return contract;
	}
}

function compileContract(code) {
	return new ContractDefinition(code);
}

module.exports = {
	compile: compileContract
}