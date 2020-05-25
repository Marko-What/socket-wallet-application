"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionErrorSocketHandler = (result, playerId, ws) => {
    if (result == "done") {
        ws.send("message: transaction with playerid: " + playerId + " done");
    }
    ;
    if (result == "error") {
        ws.send("message: something went wrong");
    }
    ;
    if (result == "errorUser") {
        ws.send("message: user wallet with playerId:" + playerId + " does already exist");
    }
    ;
    if (result == "userdoesnotexist") {
        ws.send("message: user wallet with playerId:" + playerId + " does not exist");
    }
    ;
}; /* end of transactionErrorSocketHandler */
