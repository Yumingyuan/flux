const config = require("../../helpers/config");
const { makeRequest } = require("../../utils/request");
const { Cfx,  utillCfx  } = require('../../helpers/conflux');
const web3 = require('web3');

const getCFXprice = async () => {
    const id = 'conflux-token';
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`;
    const req = await makeRequest(url, 'GET', {}, {});
    return req.data[id];
};

const convertNGNtoCFX = async (amount) => {
    const pp = await getCFXprice();
    const usdCFx = pp.usd;
    const usdNGN =  amount/config.USD;
    console.log(usdCFx, usdNGN, amount, config.USD);
    const amt =  usdNGN/usdCFx;
    const unit =  await convertUnit('CFX', 'Drip', amt.toString(10));
    var a = web3.utils.toHex(unit);
    // console.log('\n\n\n', a.toString())
    return {
        amt,
        unit:a.toString()
    }
}
const toHex = (s) => {
    if (s.substr(0,2).toLowerCase() == "0x") {
        return s;
    }

    var l = "0123456789ABCDEF";
    var o = "";

    if (typeof s != "string") {
        s = s.toString();
    }
    for (var i=0; i<s.length; i++) {
        var c = s.charCodeAt(i);

        o = o + l.substr((c>>4),1) + l.substr((c & 0x0f),1);
    }

    return "0x" + o;
};

const convertUnit = async (from, to, amount) =>{
	let converted  = await utillCfx.unit(from, to)(amount);

	return converted;
};
module.exports  = {
    getCFXprice,
    convertNGNtoCFX
}