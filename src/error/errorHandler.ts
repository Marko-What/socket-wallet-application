
export const transactionErrorHandler = async (result:any, playerId:number, res:Response): Promise<any> => {
	
		if(result instanceof Object && (result.message == "done")){
			 return res.status(200).json("message: transaction with playerid: "+result.playerId+" done."+" New player balance: "+result.newAmount);
		}
		//if(result == "done"){ return res.status(200).json("message: transaction with playerid: "+playerId+" done"); };
	
		if(result == "error"){ return res.status(400).json("message: something went wrong"); };
		if(result == "errorUser"){ return res.status(400).json("message: user does already exist"); };
		if(result == "userdoesnotexist"){ return res.status(400).json("message: wallet with playerId: "+playerId+" does not exist"); };
			
}; /* end of transactionErrorHandler */
