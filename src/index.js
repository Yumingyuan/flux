/* eslint-disable no-undef */
require('dotenv').config();
const express  = require('express');
const cors  = require('cors');
const bodyParser  = require('body-parser');
const path  = require('path');
const helmet  = require('helmet');
const routerPath = require('./routes');
const db = require('./helpers/database');
// const errorhandler = require('./utils/errorHandler');
const { jsonFailed } = require('./utils');
const { errors, isCelebrate } = require('celebrate');
const mongo_express = require('mongo-express/lib/middleware');
const mongo_express_config = require('./mongo_express_config');

const app = express();
const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 9090;
const DIR = '../client/build';
// global.logger = logger;
db.load();

// console.log(process.env.NODE_ENV,'===>', process.env.SENDGRID_API_KEY);
if (process.env.NODE_ENV === 'production'){
	global.console.log = function(){};
}
const initMiddlewares = () => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.static(path.join(__dirname, DIR)));
	app.use(helmet());
	app.use(cors());
	app.options('*', cors());
}
const initRoutes = () => {
	app.use('/v1', routerPath);
	app.use('/db-admin', mongo_express(mongo_express_config));
	// Handles any requests that don't match the ones above
	app.get('*', (req, res) => {
	  res.sendFile(path.join(__dirname, DIR, '/index.html'));
	});
	// app.all('**', (req, res)=>{
	// 	return jsonFailed(res, {}, 'route not found', 404);
	// });
}

const initErrorHandlers = () => {
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
      return jsonFailed(res, null, 'Bad Request', 400);
    }
    if (isCelebrate(err)) {
      	const messages = err.joi ? err.joi.details : err.details;
		let msg = messages.map((er)=>{ return {[er.path]: er.message.replace(/["]+/g, '')}})
      	return jsonFailed(res, msg, 'error', 400);
    }
    return next(err);
  });
  app.use(errors());
}


const build = async () => {
	initMiddlewares();
	initRoutes();
	initErrorHandlers();

	const server = app.listen(PORT, () => {
		const port = server.address().port;
		console.info(`Server listening at PORT ${port} and on ${env} mode`);
	});
};
// module.exports = app;
build();