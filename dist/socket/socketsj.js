"use strict";
/* wuaue*/
//import { Request, Response } from 'express';
/* wuaue*/
Object.defineProperty(exports, "__esModule", { value: true });
const webSocket = require("ws");
const SocketServer = require("ws").Server;
const Joi = require('joi');
const wss = new SocketServer({ port: 8080 });
const dmodal_1 = require("../dmodal/dmodal");
const schema_1 = require("../dmodal/schema");
const errorHandlerSocket_1 = require("../error/errorHandlerSocket");
exports.socket = () => {
    wss.on("connection", (ws) => {
        ws.on('message', function incoming(data, req, res) {
            /* this is additional prevention testing out if socket data is json type */
            try {
                var dataJs = JSON.parse(data);
            }
            catch (_a) {
                ws.send("message: jasmin data");
                return;
            }
            Joi.validate(dataJs, schema_1.schemaDsocket, (err, valid) => {
                console.log("err.message:");
                console.log(err);
                console.log("valid: ");
                console.log(valid);
                if (err) {
                    ws.send("message: inappropriate data");
                }
                /* valid */
                if (err == null) {
                    var datetime;
                    var time;
                    if (dataJs.datetime) {
                        datetime = dataJs.datetime;
                        time = null;
                    }
                    else {
                        time = dataJs.time;
                        datetime = null;
                    }
                    dmodal_1.transaction(dataJs.playerId, time, dataJs.amount, dataJs.type, req, res, datetime).then((result) => {
                        errorHandlerSocket_1.transactionErrorSocketHandler(result, dataJs.playerId, ws);
                        if (result instanceof Object && (result.message == "done")) {
                            ws.send("message: transaction with playerid: " + result.playerId + " done." + " New player balance: " + result.newAmount);
                            /* if successfully updated notify all the subscribers about new balance */
                            wss.clients.forEach(function each(client) {
                                if (client.readyState === webSocket.OPEN) {
                                    client.send("message: transaction with playerid: " + result.playerId + " done." + " New player balance: " + result.newAmount);
                                }
                            }); /* end of wss.clients */
                        } /* end of if() successfully updated */
                    }); /* end of transaction */
                } /* end of valid */
            }); /* end of Joi.validate */
        }); /* end of message */
    }); /* end of connection */
    wss.on("close", () => {
        console.log("server client connection  close");
    }); /* end of close */
}; /* end of socket */
