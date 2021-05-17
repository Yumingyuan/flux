const { jsonS } = require("../../utils");

const txController = {
    getBanks:async(req, res)=>{
        return jsonS(res, [], 'success', 200);
    },
}

module.exports = txController;