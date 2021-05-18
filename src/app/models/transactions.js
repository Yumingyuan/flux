'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const modelSchema = new Schema(
	{
		amount: {
			type: String,
			required: 'amount is required',
			default: 0.0,
		},
		amountCFX: {
			type: String,
			required: 'amount is required',
		},
		amountCFXUnit: {
			type: String,
			required: 'amount is required',
		},
		txHash: {
			type: String
		},
		txData: {
			type: String
		},
		explorerUrl: {
			type: String
		},
		error: {
			type: String
		},
		status: {
			type: String,
			enum: [
				'pending',
				'processing',
				'sent',
				'completed',
				'failed',
			],
			default: "initiated",
		},
		r_status: {
			type: String,
			enum: [
				'initiated',
				'awaiting',
				'pending',
				'processing',
				'sent',
				'completed',
				'failed',
			],
			default: "initiated",
		},
		respoData:{
			type: String
		}
	},
	{
		timestamps: true,
	}
);


modelSchema.plugin(uniqueValidator);

const model = mongoose.model('transactions', modelSchema);

module.exports = model;