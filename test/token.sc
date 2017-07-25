
function transfer(address, amount) {
	if (this.balances[address] == null)
		this.balances[address] = 0;
		
	this.balances[address] += amount;
}

function getBalance(address) {
	return this.balances[address];
}

function initialize() {
	this.balances = {};
}

// contract definition

contract({
	constructor: initialize,
	
	properties: {
		public: [
			"balances"
		]
	},
	
	methods: {
		public: {
			transfer: transfer,
			getBalance: getBalance
		}
	}
});

