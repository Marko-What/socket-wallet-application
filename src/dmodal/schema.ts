const Joi = require('joi');

export const schemaA = Joi.object().keys({
			playerId: Joi.number().positive().integer().min(1).max(5500).required(),
			datetime: Joi.date().required(),
			amount: Joi.number().positive().integer().min(10).max(2500).required()
});

export const schemaB = Joi.object().keys({
			playerId: Joi.number().positive().integer().min(1).max(5500).required(),
			time: Joi.date().required(),
			amount: Joi.number().positive().integer().min(10).max(2500).required()
});

export const schemaC = Joi.object().keys({
			playerid: Joi.number().positive().integer().min(1).max(5500).required(),
			page: Joi.number().positive().integer().min(1).max(100).optional()
});



export const schemaDsocket = Joi.alternatives().try(
  Joi.object().keys({
    playerId: Joi.number().positive().integer().min(1).max(5500).required(),
    datetime: Joi.date().required(),
    time: Joi.date().allow(''),
    amount: Joi.number().positive().integer().min(10).max(2500).required(),
    type: Joi.string().required().valid('start deposit', 'deposit','withdraw')
    }),
  Joi.object().keys({
    playerId: Joi.number().positive().integer().min(1).max(5500).required(),
    time: Joi.date().required(),
    datetime: Joi.date().allow(''),
    amount: Joi.number().positive().integer().min(10).max(2500).required(),
    type: Joi.string().required().valid('start deposit', 'deposit','withdraw')
    })

);

