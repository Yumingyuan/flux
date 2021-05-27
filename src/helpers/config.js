const config = {
	PROD: process.env.PROD || false,
    USD: process.env.USD || '500',
	JWT_SECRET: process.env.JWT_SECRET,
	flutterURL: process.env.FLUTTER_URL || 'https://api.flutterwave.com/v3',
	flutterKEY: process.env.FLUTTER_KEY,
	giftCardURL: process.env.GIFTCARD_URL,
	giftCardKEY: process.env.GIFTCARD_KEY,
	coinGeckoURL: process.env.COINGECKO_URL,
	blockchain: process.env.BLOCKCHAIN,
    conflux:{
        PRIVATE_KEY: process.env.CNF_PRV_KEY,
        MAIN_NET: process.env.CNF_MAIN_NET || 'http://mainnet-jsonrpc.conflux-chain.org:12537',
        TEST_NET: process.env.CNF_TEST_NET || 'http://testnet-jsonrpc.conflux-chain.org:12537',
        WALLET: process.env.CNF_WALLET || ''
    }
};

module.exports = config;