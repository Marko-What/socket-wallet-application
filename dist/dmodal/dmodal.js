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
exports.transaction = (playerId, time, amount, type, req, res, datetime) => __awaiter(void 0, void 0, void 0, function* () {
    let beforeWalletAmount;
    let newWalletAmount = 0; //let time: Date;
    /* transaction isolation */
    const client = yield database_1.pool.connect();
    try {
        yield client.query('begin isolation level serializable');
        const selectWalletQuery = 'SELECT * FROM Wallet WHERE playerId = $1';
        let selectWalletResult = yield client.query(selectWalletQuery, [playerId]);
        if (type == "start deposit") {
            /* time  || datetime, either could be passed through */
            if (datetime === undefined || datetime == null) {
                return "error";
            }
            time = datetime;
            beforeWalletAmount = 0;
            newWalletAmount = amount;
            /* additional verification verifying if user does not already exist */
            if (selectWalletResult.rows[0] === undefined || selectWalletResult.rows[0].length == 0) {
                const createNewWalletQuery = 'INSERT INTO Wallet (playerId, datetime, balance) VALUES ($1, $2, $3) RETURNING id';
                selectWalletResult = yield client.query(createNewWalletQuery, [playerId, datetime, amount]);
            }
            else {
                return "errorUser";
            } /* end if if/else additional verification */
        }
        else {
            if (time === undefined || time == null) {
                return "error";
            }
        } /* end of else */
        /* additional verification verifying if user does not already exist */
        if (selectWalletResult.rows[0] === undefined || selectWalletResult.rows[0].length == 0) {
            return "userdoesnotexist";
        } /* end if if/else additional verification */
        //newWalletAmount = (type == "deposit") ? (selectWalletResult.rows[0].balance + (amount)) : (type == "withdraw") ? (selectWalletResult.rows[0].balance - (amount)) : null;	
        if (type == "deposit") {
            newWalletAmount = selectWalletResult.rows[0].balance + (amount);
        }
        if (type == "withdraw") {
            newWalletAmount = selectWalletResult.rows[0].balance - (amount);
        }
        console.log("transaction b");
        const insertTransactionQuery = 'INSERT INTO transaction(timeCreated, playerId, transactionAmount, newWalletAmount) VALUES ($1, $2, $3, $4) RETURNING id';
        const TransactionQueryResultId = yield client.query(insertTransactionQuery, [time, playerId, amount, newWalletAmount]);
        const insertTransactionType = 'INSERT INTO transactionType (transactionId, timeCreated, type) VALUES ($1, $2, $3)';
        const insertTransactionTypeResult = yield client.query(insertTransactionType, [TransactionQueryResultId.rows[0].id, time, type]);
        const updatingplayerWallet = 'UPDATE Wallet SET balance = $1 WHERE playerId = $2';
        const updatingPlayerWalletQuery = yield client.query(updatingplayerWallet, [newWalletAmount, playerId]);
        yield client.query('COMMIT');
        //	return "done"; /* newWalletAmount, playerId */
        return { message: "done", playerId: playerId, newAmount: newWalletAmount };
    }
    catch (e) {
        yield client.query('ROLLBACK');
        return "error";
    }
    finally {
        client.release();
    }
}); /* end of function transaction */
exports.transactionCheckModal = (playerId, page, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM transaction WHERE playerid = $1', [playerId]);
        /* paginator functionality */
        const pageCount = Math.ceil(response.rows.length / 10);
        page = (page > pageCount) ? (page = pageCount) : page;
        return res.status(200).json({
            "page": page,
            "pageCount": pageCount,
            "transactions": response.rows.reverse().slice(page * 10 - 10, page * 10)
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    } /* end of try catch block */
}); /* end of transactionCheckModal */
