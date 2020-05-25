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
exports.newWallet = (playerId, datetime, balance, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = "start Deposit";
    /* functionality responsible verifying if user wallet does alreday exist */
    const check = yield database_1.pool.query('SELECT * FROM Wallet WHERE playerId = $1', [playerId]);
    if (check.rows === undefined || check.rows.length == 0) {
        try {
            const response = yield database_1.pool.query('INSERT INTO Wallet (playerId, datetime, balance) VALUES ($1, $2, $3)', [playerId, datetime, balance]);
            const startTransactionResponse = yield startTransaction(playerId, datetime, balance, req, res);
            const transactionId = startTransactionResponse;
            yield transactionType(transactionId, type, datetime, req, res);
            //	return res.status(200).json("wallet with playerId:"+playerId+" successfully created");
            return "done";
        }
        catch (e) {
            console.log(e);
            return "error";
            //  return res.status(500).json('Internal Server error');
        }
    }
    else {
        return "exist";
        //return res.status(200).json("wallet with playerId:"+playerId+" already exist");
    } /* end of if if(check.rows === undefined  */
}); /* end of newWallet */
exports.walletDepositModal = (time, playerId, amount, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        try {
            const checkA: QueryResult = await pool.query('SELECT * FROM Wallet WHERE playerId = $1', [playerId]);
         } catch (e) {
            return "none";
         }
    */
    const checkA = yield database_1.pool.query('SELECT * FROM Wallet WHERE playerId = $1', [playerId]);
    if (checkA.rows === undefined || checkA.rows.length == 0) {
        return res.status(200).json("wallet with playerId:" + playerId + " does not exist");
    }
    else {
        try {
            let beforeWalletAmountA = yield database_1.pool.query('SELECT * FROM Wallet WHERE playerId = $1', [playerId]);
            const beforeWalletAmount = beforeWalletAmountA.rows[0].balance;
            const newWalletAmount = beforeWalletAmount + (amount);
            /*
                    console.log(+ beforeWalletAmount + ", " + newWalletAmount);
                res.send("hellow: "+ beforeWalletAmount + ", " + newWalletAmount)
                */
            const response = yield database_1.pool.query('INSERT INTO transaction(timeCreated, playerId, transactionAmount, beforeWalletAmount, newWalletAmount) VALUES ($1, $2, $3, $4, $5) RETURNING id', [time, playerId, amount, beforeWalletAmount, newWalletAmount]);
            const responseC = yield database_1.pool.query('UPDATE Wallet SET balance = $1 WHERE playerId = $2', [newWalletAmount, playerId]);
            const typeB = "deposit";
            const transactionIdB = yield response.rows[0].id;
            yield transactionType(transactionIdB, typeB, time, req, res);
            return "done";
            /*	res.json({
                      message: 'transaction with playerid: '+ playerId+ " done",
                });*/
        }
        catch (e) {
            return "none";
            //console.log(e);
            /*	return res.status(500).json('Internal Server error');*/
        }
    } // end of if if(check.rows === undefined 
}); /* end of walletDepositModal */
exports.walletWithdrawModal = (playerId, time, amount, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkA = yield database_1.pool.query('SELECT * FROM Wallet WHERE playerId = $1', [playerId]);
    //console.log(checkA.rows);
    if (checkA.rows === undefined || checkA.rows.length == 0) {
        //return res.status(200).json("wallet with playerId:"+playerId+" does not exist");
        return "userdoesnotexist";
    }
    else {
        try {
            /* double const { time, playerId, amount} = req.body;*/
            //	const { time, playerId, amount} = req.body;
            let beforeWalletAmountA = yield database_1.pool.query('SELECT * FROM Wallet WHERE playerId = $1', [playerId]);
            const beforeWalletAmount = beforeWalletAmountA.rows[0].balance;
            const newWalletAmount = beforeWalletAmount - (amount);
            const response = yield database_1.pool.query('INSERT INTO transaction(timeCreated, playerId, transactionAmount, beforeWalletAmount, newWalletAmount) VALUES ($1, $2, $3, $4, $5) RETURNING id', [time, playerId, amount, beforeWalletAmount, newWalletAmount]);
            const responseC = yield database_1.pool.query('UPDATE Wallet SET balance = $1 WHERE playerId = $2', [newWalletAmount, playerId]);
            const typeC = "withdraw";
            const transactionIdC = yield response.rows[0].id;
            yield transactionType(transactionIdC, typeC, time, req, res);
            return "done";
            /*
            res.json({
                  message: 'transaction with playerid: '+ playerId+ " done",
            });
                    */
        }
        catch (e) {
            return "error";
            /*	console.log(e);
                return res.status(500).json('Internal Server error');
            */
        }
    } // end of if if(check.rows === undefined 
}); /* end of walletWithdrawModal */
function startTransaction(playerIdA, datetimeA, balanceA, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const time = datetimeA;
        const playerId = playerIdA;
        const amount = balanceA;
        /* check if playerId wallet does exist */
        const checkA = yield database_1.pool.query('SELECT * FROM Wallet WHERE playerId = $1', [playerId]);
        if (checkA.rows === undefined || checkA.rows.length == 0) {
            return res.status(200).json("wallet with playerId:" + playerIdA + " does not exist");
        }
        else {
            try {
                const beforeWalletAmount = 0;
                const newWalletAmount = amount;
                const response = yield database_1.pool.query('INSERT INTO transaction(timeCreated, playerId, transactionAmount, beforeWalletAmount, newWalletAmount) VALUES ($1, $2, $3, $4, $5) RETURNING id', [time, playerId, amount, beforeWalletAmount, newWalletAmount]);
                return response.rows[0].id;
            }
            catch (e) {
                console.log(e);
                return res.status(500).json('Internal Server error');
            }
        } // end of if if(check.rows === undefined 			
    });
}
; // end of startTransaction
/* private functionality */
function transactionType(transactionIdA, typeA, timeCreatedA, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /* input validation */
        const type = typeA;
        const timeCreated = timeCreatedA;
        const transactionId = transactionIdA;
        try {
            const response = yield database_1.pool.query('INSERT INTO transactionType (transactionId, timeCreated, type) VALUES ($1, $2, $3)', [transactionId, timeCreated, type]);
            // return res.status(200).json(response.rows);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server error');
        }
    });
}
; // end of transactionType
