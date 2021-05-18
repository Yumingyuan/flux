const { jsonS, jsonFailed } = require("../../utils");
const models = require("../models");
const { getCFXprice, convertNGNtoCFX } = require("../service/conflux.service");

const txController = {
    getBanks:async(req, res)=>{
        return jsonS(res, [], 'success', 200);
    },

    create:async(req, res) => {
        const { product, customer, amount, note } = req.body;
        let pp = await convertNGNtoCFX(amount);
        let amountCFX = pp.amt, amountCFXUnit = pp.unit;
        let newTx = await models.transaction.create({
            product,
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

        }else{
            // update tx with status
            await models.transaction.findOneAndUpdate({ _id: txId }, {
                status:'error', txHash, data: txData, error
            });
            
        };        
        return jsonS(res,  null, 'success', 200);
    }
}

module.exports = txController;