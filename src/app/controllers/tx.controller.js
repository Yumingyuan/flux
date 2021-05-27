const { jsonS, jsonFailed } = require("../../utils");
const models = require("../models");
const { getCFXprice, convertNGNtoCFX } = require("../service/conflux.service");
const flutteData = require('../../helpers/flutterData.json');
const flutteProd = require('../../helpers/flutterProd.json');
const { Flutter } = require("../../helpers/API");
const config = require("../../helpers/config");

const txController = {
    getServices:async(req, res)=>{
        // get All services From Flutterwave
        let country = req.query.country;
        let response = config.PROD? flutteProd:flutteData;
        // console.log(response, config.PROD);
        let up = response.data.filter((r)=>r.country===country);
        let data = up.map(({biller_name, name, short_name}) => { return {label:`${name} (${biller_name})`, value:short_name}; });
        return jsonS(res, data, 'success', 200);
    },

    getMainServices:async(req, res)=>{
        let response = config.PROD? flutteProd:flutteData;
        let up = response.data.slice(0, 3);
        // console.log(up, config.PROD);
        let data = up.map(({biller_name, name, short_name, country}) => { 
            return {label:`${name} (${biller_name})`, value:short_name, country: country}; 
        });
        return jsonS(res, data, 'success', 200);
    },

    create:async(req, res) => {
        const { product, customer, amount, note, country } = req.body;
        let pp = await convertNGNtoCFX(amount);
        let amountCFX = pp.amt, amountCFXUnit = pp.unit;
        let ItemCode = product;
        let response = config.PROD? flutteProd:flutteData;
        let type = response.data.filter((dat) => {
            return ItemCode===dat.item_code;
        })[0];
        let newTx = await models.transaction.create({
            billerName: type.biller_name,
            billerType: 'flutter',
            serviceType: type.is_airtime ? 'AIRTIME' : 'others',
            is_airtime: type.is_airtime,
            fee: type.fee,
            commission: type.default_commission,
            country,
            product,
            itemCode: product,
            item: JSON.stringify(type),
            customer,
            amount,
            amountCFX,
            amountCFXUnit,
            note,
            status:'pending'
        });
        return jsonS(res, newTx, 'success', 200);
    },

    updateTx:async(req, res) => {
        const { txId, status, txHash, txData, error } = req.body;
        // let exists = await models.transaction.findOne({_id: txId}).lean();
        let exists = await models.transaction.findOne({_id: txId, status: 'pending'}).lean();
        console.log(txId);
        if(!exists){
            return jsonFailed(res, null, 'Invalid Transaction ID', 400, exists);
        };

        if(status==='success'){
            // update tx with status
            await models.transaction.findOneAndUpdate({ _id: txId }, {
                status:'processing', txHash, data: txData, error
            });
            // processing Payout
            const txProcs = await txController.madeTransfer(exists);
            console.log(txProcs);
        }else{
            // update tx with status
            await models.transaction.findOneAndUpdate({ _id: txId }, {
                status:'error', txHash, data: txData, error
            });
        };        
        return jsonS(res,  null, 'success', 200);
    },

    madeTransfer:async (trans) => {
        // console.log(trans);
        let response, res, body;
        let biller_name = trans.country==='GH' ? trans.billerName: undefined;
        if(trans.serviceType==='GiftCards'){
            body = {
                merchant: trans.itemCode,
                amount: trans.amount,
                quantity: trans.rate,
                channel: 'Api',
                buy_type: 'friend',
                friend_name: trans.customerName,
                friend_email: trans.customerEmail,
                friend_phone: trans.customerData
            };
            console.log(body);
            // response = await GiftCardAPI.post('purchases', body);
            // res = response.data;
            res = { error: true, msg:'coming soon'};
        }else{
            body = {
                country: trans.country,
                customer: trans.customer,
                amount: trans.amount,
                type: trans.billerName,
                reference: 'tx_flux'+trans._id,
                biller_name
            };
            console.log('body==>', body);
            response = await Flutter.post(`/bills`, body);
            res = response.data;
        }
        // console.log(res);
        await models.transaction.findOneAndUpdate({txId: trans.txId}, {respoData: JSON.stringify(res)});
        return res;
    },

}

module.exports = txController;