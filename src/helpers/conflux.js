const { Conflux, Account, Drip, util  } = require('js-conflux-sdk');
// const config = require('../config');

// const Cfx = (prod=false) =>{
// 	const url = prod ? config.MAIN_NET : config.TEST_NET ;
// 	const cfx = new Conflux({
// 		url:url,
// 		defaultGasPrice: 200, // The default gas price of your following transactions
// 		defaultGas: 2000000,
// 		// logger: console
// 	});
// 	return cfx;
// };

module.exports = {
    createAccount:Account,
    utillCfx:util,
    dripCfx:Drip
};