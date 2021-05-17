const config = require('../../config');
const { jsonFailed, jsonS } = require('../../utils/response');
const authToken = `${config.UNIVERSAL.SECRET}`;

const authMiddleware = async (req, res, next) => {
	var tok = req.headers['api-token'] || req.body['api-token'] || req.headers.authorization || req.header.Authorization;
    let message;
	if(!tok){
        message = 'Access Denied, No token provided.';
        return jsonFailed(res, {}, message, 401);
    }
	else if(tok){ var token = tok.split(' ')[1];}
	else{  token = tok; }
	if (!token){
        message = 'Access Denied, No token provided.';
        return jsonFailed(res, {}, message, 401)
    }
	let valid = await Validate(token);
	// let valid = await models.AccessToken.findOne({where:{public_token:token, status:true}});
	// console.log(token, valid);
	if(valid.error){
		return jsonFailed(res, {}, valid.message,401, {});
	}
	req.user = valid;
	if(valid) next();
};

const Validate = async (token) => {
    return token === authToken;
}
module.exports = authMiddleware;