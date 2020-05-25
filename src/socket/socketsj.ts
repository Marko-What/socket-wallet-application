

const webSocket = require("ws");
const SocketServer = require("ws").Server;
const Joi = require('joi');

const wss = new SocketServer({ port: 8080 });

import { transaction, transactionCheckModal } from '../dmodal/dmodal';

import { schemaDsocket } from '../dmodal/schema';

import { transactionErrorSocketHandler } from '../error/errorHandlerSocket';


export const socket = () => {

wss.on("connection", (ws:any) => {

ws.on('message', function incoming(data:any, req:Request, res:Response) {

		/* this is additional prevention testing out if socket data is json type */
				try {
					var dataJs = JSON.parse(data);
				 } catch  {
					ws.send("message: jasmin data");
					return;			
			}
	

		Joi.validate(dataJs, schemaDsocket, (err:any, valid:any) => {

				if(err){
					ws.send("message: inappropriate data");
				}		
				/* valid */
				if(err == null){	
			
						var datetime;	var time;
					if(dataJs.datetime){ 
							datetime = dataJs.datetime; time = null;
					} else { 
							time = dataJs.time; datetime = null;
					}

				


					transaction(dataJs.playerId, time, dataJs.amount, dataJs.type, req, res, datetime).then((result):any=>{	
								
								transactionErrorSocketHandler(result, dataJs.playerId, ws);

							if(result instanceof Object && (result.message == "done")){
					
								ws.send("message: transaction with playerid: "+result.playerId+" done."+" New player balance: "+result.newAmount);
							/* if successfully updated notify all the subscribers about new balance */
								wss.clients.forEach(function each(client:any) { 
									if (client.readyState === webSocket.OPEN) {
											client.send("message: transaction with playerid: "+result.playerId+" done."+" New player balance: "+result.newAmount);
									}		
						 		}); /* end of wss.clients */

								}/* end of if() successfully updated */

						}); /* end of transaction */


			}/* end of valid */


	});/* end of Joi.validate */


});/* end of message */



}); /* end of connection */







wss.on("close", () => {
	console.log("server client connection  close");
}); /* end of close */











}/* end of socket */
