const { Joi } = require('celebrate');

const createTxSchema = {
	body: Joi.object().keys({
		product: Joi.string().required(),
		customer: Joi.number().required(),
		amount: Joi.number().required(),
		note: Joi.string().required()
	})
};
const updateTxSchema = {
	body: Joi.object().keys({
		txId: Joi.string().required(),
        status: Joi.string().required().valid('success', 'failed'),
		txHash: Joi.string().allow(''),
		txData: Joi.string().allow(''),
		error: Joi.string().allow('')
	})
}

module.exports ={
    createTxSchema,
    updateTxSchema
}