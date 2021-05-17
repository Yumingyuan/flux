const { jsonFailed } = require('../../utils');

const controller = (controller) => {
	return async (req, res, next) => {
		try{
			await controller(req, res, next);
		}catch(err){
			console.log('err==>', err);
			return jsonFailed(res, null, 'Server Error', 500, err);
		}
	};
};
module.exports = controller;