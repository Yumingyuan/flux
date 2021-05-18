'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const modelSchema = new Schema(
	{
		name: {
			type: String,
			required: 'product name is required',
			default: 0.0,
		},
        description:{
            type: String, 
        },
        biller:{
            type: String,
            default:'flutterwave'
        },
        country:{
            type: String
        },
        image:{
            type: String,
            default: ''
        },
		status: {
			type: String,
			enum: [
                'active',
                'disabled',
                'inactive',
                'valid'
			],
			default: "active",
		},
	},
	{
		timestamps: true,
	}
);


modelSchema.plugin(uniqueValidator);

const model = mongoose.model('products', modelSchema);

module.exports = model;