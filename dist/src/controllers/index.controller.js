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
const Joi = require('joi');
//import { Joi } from 'joi';
exports.walletCreate = (req, res) => {
    const { playerId, datetime, balance } = req.body;
    dmodal_1.newWallet(playerId, datetime, balance, req, res).then((result) => {
        if (result == "done") {
            return res.status(200).json("wallet with playerId:" + playerId + " successfully created");
        }
        ;
        if (result == "error") {
            return res.status(500).json('Internal Server error');
        }
        ;
        if (result == "exist") {
            return res.status(200).json("wallet with playerId:" + playerId + " already exist");
        }
        ;
    }); /* end of newWallet */
}; /* end of walletCreate */
exports.walletWithdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerId, time, amount } = req.body;
    console.log(playerId);
    const schema = Joi.object().keys({
        playerId: Joi.number().positive().integer().min(1).max(5500).required(),
        time: Joi.date().required(),
        amount: Joi.number().positive().integer().min(10).max(2500).required()
    });
    Joi.validate(req.body, schema, (err, valid) => {
        if (err) {
            return res.status(200).json("err: " + err);
        }
        if (valid) {
            console.log("data is valid: " + valid);
        }
    });
    dmodal_1.walletWithdrawModal(playerId, time, amount, req, res).then((result) => {
        if (result == "done") {
            return res.status(200).json("transaction with playerid:" + playerId + " done");
        }
        ;
        if (result == "error") {
            return res.status(500).json('Internal Server error');
        }
        ;
        if (result == "userdoesnotexist") {
            return res.status(200).json("wallet with playerId:" + playerId + " does not exist");
        }
        ;
    }); /* end of newWallet */
}); /* end of walletWithdraw */
exports.walletDeposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { time, playerId, balance } = req.body;
    const schemaOccurence = Joi.object().keys({
        playerId: Joi.number().positive().integer().min(1).max(5500).required(),
        time: Joi.date().required(),
        amount: Joi.number().positive().integer().min(10).max(2500).required()
    });
    Joi.validate(req.body, schemaOccurence, (err, valid) => {
        if (err) {
            return res.status(200).json("err: " + err);
        }
        if (valid) {
            console.log("data is valid: " + valid);
        }
    });
    dmodal_1.walletDepositModal(time, playerId, balance, req, res).then((result) => {
        if (result == "done") {
            res.json({ message: 'transaction with playerid: ' + playerId + " done", });
        }
        else {
            return res.status(400).json('Internal Server error');
        }
    }); /*end of walletDepositModal */
}); /*end of walletDeposit */
/* transaction check*/
exports.transactionCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*	let playerIdA = req.params.id;
            console.log(Number.isInteger(req.params.id));
        if(Number.isInteger(playerIdAs)){
            const playerId = req.params.id;
        } else {
            const playerId = 19;
        }
    */
    const playerId = req.params.playerid;
    try {
        const response = yield database_1.pool.query('SELECT * FROM transaction WHERE playerid = $1', [playerId]);
        return res.status(200).json(response.rows);
        /*	if(playerIda){
                 const response: QueryResult = await pool.query('SELECT * FROM transaction WHERE playerid = $1', [playerIda]);
                return res.status(200).json(response.rows);
            } else {
                     const response: QueryResult = await pool.query('SELECT * FROM transaction');
                      return res.status(200).json(response.rows);
            }
        */
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    } /* end of try catch block */
});
/* transactionTypeCheck */
exports.transactionTypeCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM transactionType');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}); /* end of transactionTypeCheck  */
