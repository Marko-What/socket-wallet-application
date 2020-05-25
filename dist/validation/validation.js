"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require('joi');
exports.schemaTransData = (playerId, datetime, balance) => __awaiter(void 0, void 0, void 0, function* () {
    const schemaOccurence = Joi.object().keys({
        playerId: Joi.number().positive().integer().min(1).max(5500).required(),
        time: Joi.date().required(),
        amount: Joi.number().positive().integer().min(10).max(2500).required()
    });
    Joi.validate(req.body, schemaOccurence, (err, valid) => {
        if (err) {
            return "falseData";
        }
        if (valid) {
            console.log("data is valid: " + valid);
        }
    });
}); /* end of schemaTransData */
