const { Flutter, GiftCardAPI, CoinGecko } = require('../../helpers/API');
const { config } = require('../../config');
const { validationResult } = require('express-validator');
const flutteData = require('../../helpers/flutterData.json');
const flutteProd = require('../../helpers/flutterProd.json');
const { Transaction } = require('../../models');
const { saveUser } = require('./auth');
const { returnDepositCnfAddress, validateConfluxTrans } = require('../blockchain/conflux');
const { default: Axios } = require('axios');

const serviceController = {
    getCategories:async (req, res) => {
        let data = [
            {id: 1, name:'Airtime & Bills Payments', key:'bills'},
            {id: 2, name:'Giftcards Purchase', key: 'giftcards'}
        ];
	return res.status(200).json({data});
    },

    getServices:async (req, res) => {
        try{
            // get All services From Flutterwave
            let response = config.PROD? flutteProd:flutteData;
            console.log(response, config.PROD);
            let data = response.data.map(({biller_name, short_name, item_code}) => { return {label:`${short_name} (${biller_name})`, value:short_name}; });
            return res.status(200).json({data});
        }catch(err){
            return res.status(500).json({error:err.response.data});
        }
    },

    getServiceInput:async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }
        let ItemCode = req.query.item_code;
        let response = config.PROD? flutteProd:flutteData;
        let type = response.data.filter((data) => ItemCode===data.short_name)[0];
        console.log(ItemCode, type);
        if(!type) return res.status(400).json({error: 'No Item to get Input for'});
        let data = [
            {
                label: type.label_name,
                name: 'customer_data',
                type: 'text',
                required: true,
                readOnly: false
            },
            {
                label: 'Amount',
                name: 'amount',
                type: 'tel',
                required: type.amount===0,
                readOnly: type.amount!==0,
                amount: type.amount
            },
            {
                label: 'Name',
                name: 'customer_name',
                type: 'text',
                required: true,
                readOnly: false
            },
            {
                label: 'Email',
                name: 'customer_email',
                type: 'email',
                required: true,
                readOnly: false
            },
            {
                label: 'Wallet Address',
                name: 'wallet_address',
                type: 'string',
                required: true,
                readOnly: false
            }
        ];
        return res.status(200).json({data});
    },

    makeTransaction:async (req, res) => {
        let owner = req.user.userId;
        let prod = req.user.prod;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }
        let data = req.body;
        console.log(req.user);

        let ItemCode = req.body.item_code;
        let response = config.PROD? flutteProd:flutteData;
        let type = response.data.filter((dat) => {
            console.log(dat);
            return ItemCode===dat.short_name;
        })[0];
        console.log(type, ItemCode);
        let transaction = {
            owner,
            prod,
            serviceType: data.service,
            billerName: type.biller_name,
            billerType: type.name,
            country: type.country,
            amount: data.amount,
            is_airtime: type.is_airtime,
            fee: type.fee,
            commission: type.default_commission,
            customerData: data.customer_data,
            customerName: data.customer_name,
            customerEmail: data.customer_email,
            walletAddress: data.wallet_address,
            itemCode: data.item_code,
            item: JSON.stringify(type)
        };
        let newTrans =  new Transaction(transaction);
        let saved = await newTrans.save();
        console.log(saved);
        // if(!type) return res.status(400).json({error: 'No Item to get Input for'})
        return res.status(200).json({transaction:saved});
    },
    getCryptoAmount:async (amount, cur='ngn') => {
        let cid = 'conflux-token';
        console.log('cid', cid);
        let coin = await CoinGecko.get(`/coins/${cid}`);
        console.log('Amount==>', coin.data.market_data.current_price[cur]);
        let exco = coin.data.market_data.current_price[cur];
        let mainAm = (Number(amount) * 1)/exco;
        return mainAm;
    },
    processTransaction:async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }
        let txId = req.params.txId;
        let owner = req.user.userId;
        let type = req.type;
        // console.log(txId, owner);
        let depositAddress, paymentMethod, symbol, cryptoAmount;
        let cnT = await Transaction.findOne({txId, owner});
        console.log(cnT);
        if(!cnT){
            res.status(400).json({error:'No transaction with txId'});
        }
        try{
            depositAddress = await returnDepositCnfAddress();
            paymentMethod = 'conflux';
            symbol = 'CFX';
            let cryptoAmt = await getCryptoAmount(cnT.amount);
            let mm = cryptoAmt.toFixed(2);
            cryptoAmount = mm.toString();
            let update = {depositAddress, paymentMethod, cryptoAmount, symbol};
            console.log('====>', update);
            await Transaction.findOneAndUpdate({txId, owner}, update).lean();
            let transa = await Transaction.findOne({txId, owner});
            console.log(transa);
            return res.status(200).json({data: transa});
        }catch(err){
            console.log(err);
            return res.status(500).json({error:'Server Error Occurred'});
        }
    },

    madeTrasfer:async (trans) => {
        console.log(trans);
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
            response = await GiftCardAPI.post('purchases', body);
            res = response.data;
        }else{
            body = {
                country: trans. country,
                customer: trans.customerData,
                amount: trans.amount,
                type: trans.billerName,
                reference: trans.txId,
                biller_name
            };
            response = await Flutter.post(`/bills`, body);
            res = response.data;
        }
        console.log(res);
        await Transaction.findOneAndUpdate({txId: trans.txId}, {orderId: JSON.stringify(res)});
        return response.data;
    },
    validateTransfer:async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }
        let txId = req.params.txId;
        let btxId = req.body.btxId;
        let owner = req.user.userId;
        let type = req.type;
        let val = {};
        try{
            // console.log(txId, owner);
            let trans = await Transaction.findOne({txId, owner});
            console.log(trans);
            if(!trans) return res.status(500).json({message: 'No Transaction made'});
            val = await validateConfluxTrans(trans.walletAddress, trans.depositAddress, btxId, trans.createdAt, trans.cryptoAmount, trans.isHalf, trans.halfAmount, trans.halfTxId);
            console.log('conflux');
            let data = val;
            if(val.count===2){
                console.log('updating===>');
                let datad = {isHalf:true, halfAmount: val.amount, halfTxId: val.txId};
                let up = await Transaction.findOne({txId, owner});
                up.isHalf = true;
                up.halfAmount=val.amount;
                up.halfTxId = val.txId;
                up.save();
                console.log('updated==>', up, 'data==>', datad);
            }
            if(val.success){
                let bill = await madeTrasfer(trans);
                data.message = 'Transaction Successful';
                data.success = true;
                console.log('bb==>', bill);
            }
            return res.status(200).json({data});
        }catch(err) {
            console.log(err.response);
            return res.status(500).json({err:'an Error Occurred'});
        }
    }
}


module.exports= serviceController;