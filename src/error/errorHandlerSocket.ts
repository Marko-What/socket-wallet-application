
export const transactionErrorSocketHandler = (result:any, playerId:number, ws:any) => {
		
		if(result instanceof Object && (result.message == "done")){
			  ws.send("message: transaction with playerid: "+result.playerId+" done."+" New player balance: "+result.newAmount);
		}
		
		if(result == "error"){ ws.send("message: something went wrong"); };
		if(result == "errorUser") { ws.send("message: user wallet with playerId:"+ playerId+" does already exist");  };
		if(result == "userdoesnotexist"){  ws.send("message: user wallet with playerId:"+ playerId+" does not exist"); };
			

}; /* end of transactionErrorSocketHandler */
