'use strict';

const { celebrate } = require('celebrate');
const controller = require('../app/adaptors/controller');
const { getBanks, create, updateTx, getServices, getMainServices } = require('../app/controllers/tx.controller');
const { createTxSchema, updateTxSchema } = require('../app/requests/main.request');
const router = require('express').Router();

// fetch categories
router.get(
	'/services', 
	getServices
);

// get main services
router.get(
    '/main/cat',
    getMainServices
)

// withdraw route
router.post(
    '/create-order',
    celebrate(createTxSchema),
    controller(create)
);

// update route
router.post(
    '/update-order',
    celebrate(updateTxSchema),
    controller(updateTx)
);

module.exports = {
    baseUrl: '/tx',
    router
};