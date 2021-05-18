'use strict';

const { celebrate } = require('celebrate');
const controller = require('../app/adaptors/controller');
const { getBanks, create, updateTx } = require('../app/controllers/tx.controller');
const { createTxSchema, updateTxSchema } = require('../app/requests/main.request');
const router = require('express').Router();

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