"use strict";
//import { Response } from 'express';
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
/*
export const walletErrorHandler = async (result:any, playerId:number, res:Response): Promise<any> => {
    
        if(result){}
        if(result == "done"){ return res.status(200).json("transaction with playerid:"+playerId+" done"); };


        if(result == "error"){ return res.status(400).json("message: something went wrong"); };
        if(result == "errorUser"){ return res.status(400).json("message: user does already exist"); };
            
};*/ /* end of walletErrorHandler */
exports.transactionErrorHandler = (result, playerId, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (result instanceof Object && (result.message == "done")) {
        return res.status(200).json("message: transaction with playerid: " + result.playerId + " done." + " New player balance: " + result.newAmount);
    }
    //if(result == "done"){ return res.status(200).json("message: transaction with playerid: "+playerId+" done"); };
    if (result == "error") {
        return res.status(400).json("message: something went wrong");
    }
    ;
    if (result == "errorUser") {
        return res.status(400).json("message: user does already exist");
    }
    ;
    if (result == "userdoesnotexist") {
        return res.status(400).json("message: wallet with playerId: " + playerId + " does not exist");
    }
    ;
}); /* end of transactionErrorHandler */
