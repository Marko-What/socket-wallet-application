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
const database_1 = require("../database");
const dmodal_1 = require("../dmodal/dmodal");
const schema_1 = require("../dmodal/schema");
const errorHandler_1 = require("../error/errorHandler");
const Joi = require('joi');
exports.walletCreate = (req, res) => {
    const type = "start deposit";
    Joi.validate(req.body, schema_1.schemaA, (err, valid) => {
        if (err) {
            return res.status(200).json("err: " + err);
        }
        if (valid) {
            const { playerId, datetime, amount } = req.body;
            dmodal_1.transaction(playerId, null, amount, type, req, res, datetime).then((result) => {
                errorHandler_1.transactionErrorHandler(result, playerId, res);
            }); /* end of transaction */
        } /*end of if valid */
    }); /* end of data validation function  */
}; /* end of walletCreate */
/* returning promises should be considered using asnyc function keyword */
exports.walletWithdraw = (req, res) => {
    const type = "withdraw";
    Joi.validate(req.body, schema_1.schemaB, (err, valid) => {
        if (err) {
            return res.status(200).json("err: " + err);
        }
        if (valid) {
            const { playerId, time, amount } = req.body;
            dmodal_1.transaction(playerId, time, amount, type, req, res, null).then((result) => {
                errorHandler_1.transactionErrorHandler(result, playerId, res);
            }); /* end of transaction */
        } /* end of if valid */
    }); /* end of data validation function  */
}; /* end of walletWithdraw */
exports.walletDeposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = "deposit";
    Joi.validate(req.body, schema_1.schemaB, (err, valid) => {
        if (err) {
            return res.status(200).json("err: " + err);
        } /*end of if(err) */
        if (valid) {
            const { playerId, time, amount } = req.body;
            dmodal_1.transaction(playerId, time, amount, type, req, res, null).then((result) => {
                errorHandler_1.transactionErrorHandler(result, playerId, res);
            }); /* end of transaction */
        } /*end of if(valid) */
    }); /* end of data validation function  */
}); /*end of walletDeposit */
exports.transactionCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Joi.validate(req.params, schema_1.schemaC, (err, valid) => {
        if (err) {
            return res.status(200).json("err: " + err);
        }
        if (valid) {
            const playerId = parseInt(req.params.playerid);
            let page = (parseInt(req.params.page)) ? parseInt(req.params.page) : 1;
            dmodal_1.transactionCheckModal(playerId, page, req, res).then((result) => {
                if (result == "error") {
                    return res.status(400).json('Internal Server error');
                }
                else {
                    res.json(result);
                }
            }); /*end of walletDepositModal */
        } /*end of valid */
    }); /* end of data validation function  */
}); /* end of transaction check*/
/* testing route  should be removed */
/* transactionTypeCheck */
exports.transactionTypeCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM transactionType');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(400).json('Internal Server error');
    }
}); /* end of transactionTypeCheck  */
