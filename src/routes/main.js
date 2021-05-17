'use strict';

const { celebrate } = require('celebrate');
const controller = require('../app/adaptors/controller');
const { getBanks } = require('../app/controllers/tx.controller');
const router = require('express').Router();

// withdraw route
router.get(
    '/withdraw',
    // celebrate(withdrawSchema),
    controller(getBanks)
);

module.exports = {
    baseUrl: '/tx',
    router
};