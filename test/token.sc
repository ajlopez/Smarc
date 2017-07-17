
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

// contract public methods

public('transfer', transfer);
public('getBalance', getBalance);
public('initialize', initialize);

