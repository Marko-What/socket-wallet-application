"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require('joi');
exports.schemaA = Joi.object().keys({
    playerId: Joi.number().positive().integer().min(1).max(5500).required(),
    datetime: Joi.date().required(),
    amount: Joi.number().positive().integer().min(10).max(2500).required()
});
exports.schemaB = Joi.object().keys({
    playerId: Joi.number().positive().integer().min(1).max(5500).required(),
    time: Joi.date().required(),
    amount: Joi.number().positive().integer().min(10).max(2500).required()
});
exports.schemaC = Joi.object().keys({
    playerid: Joi.number().positive().integer().min(1).max(5500).required(),
    page: Joi.number().positive().integer().min(1).max(100).optional()
});
exports.schemaDsocket = Joi.alternatives().try(Joi.object().keys({
    playerId: Joi.number().positive().integer().min(1).max(5500).required(),
    datetime: Joi.date().required(),
    time: Joi.date().allow(''),
    amount: Joi.number().positive().integer().min(10).max(2500).required(),
    type: Joi.string().required().valid('start deposit', 'deposit', 'withdraw')
}), Joi.object().keys({
    playerId: Joi.number().positive().integer().min(1).max(5500).required(),
    time: Joi.date().required(),
    datetime: Joi.date().allow(''),
    amount: Joi.number().positive().integer().min(10).max(2500).required(),
    type: Joi.string().required().valid('start deposit', 'deposit', 'withdraw')
}));
/*
export const schemaDsocket = Joi.object().keys({
            playerId: Joi.number().positive().integer().min(1).max(5500).required(),
            datetime: Joi.date().required(),
            amount: Joi.number().positive().integer().min(10).max(2500).required(),
            type: Joi.string().required().valid('start deposit')
}); */ /* .or('time', 'datetime') */
/*
export const schemaEsocket = Joi.object().keys({
            playerId: Joi.number().positive().integer().min(1).max(5500).required(),
            time: Joi.date().required(),
            amount: Joi.number().positive().integer().min(10).max(2500).required(),
            type: Joi.string().required().valid('deposit','withdraw')
});
*/
