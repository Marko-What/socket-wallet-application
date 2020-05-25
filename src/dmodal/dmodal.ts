import { pool } from '../database';
import { QueryResult } from 'pg';
import { Request, Response } from 'express';

import { timeType, typeType } from './typings';


																													
export const transaction = async(playerId:number, time:timeType, amount:number, type:typeType, req:Request, res:Response, datetime:any): Promise<any> => {
			

			let beforeWalletAmount:number; let newWalletAmount:number = 0; //let time: Date;

						/* transaction isolation */

				const client = await pool.connect()
				try {

					await client.query('begin isolation level serializable') 

					const selectWalletQuery = 'SELECT * FROM Wallet WHERE playerId = $1'
		
					let selectWalletResult = await client.query(selectWalletQuery, [playerId])
					
					if(type == "start deposit"){

				
						/* time  || datetime, either could be passed through */				
						if(datetime === undefined || datetime == null){ return "error"; }

						 time = datetime;  beforeWalletAmount = 0; newWalletAmount = amount;


							/* additional verification verifying if user does not already exist */
							if(selectWalletResult.rows[0] === undefined || selectWalletResult.rows[0].length == 0){
									const createNewWalletQuery = 'INSERT INTO Wallet (playerId, datetime, balance) VALUES ($1, $2, $3) RETURNING id'
									selectWalletResult = await client.query(createNewWalletQuery, [playerId, datetime, amount])
	
							} else {
									return "errorUser";
							}/* end if if/else additional verification */
						
					} else {

						if(time === undefined || time == null){ return "error"; }			
		
					} /* end of else */




				/* additional verification verifying if user does not already exist */
							if(selectWalletResult.rows[0] === undefined || selectWalletResult.rows[0].length == 0){
									return "userdoesnotexist";
							} /* end if if/else additional verification */



		//newWalletAmount = (type == "deposit") ? (selectWalletResult.rows[0].balance + (amount)) : (type == "withdraw") ? (selectWalletResult.rows[0].balance - (amount)) : null;	

		 			if(type == "deposit"){
						 newWalletAmount = selectWalletResult.rows[0].balance + (amount);
					}	
					if(type == "withdraw"){
						 newWalletAmount = selectWalletResult.rows[0].balance - (amount);
					}
		

					
					const insertTransactionQuery = 'INSERT INTO transaction(time, playerId, transactionAmount, newWalletAmount) VALUES ($1, $2, $3, $4) RETURNING id';
					const TransactionQueryResultId = await client.query(insertTransactionQuery, [time, playerId, amount, newWalletAmount]);		
	
				
					const insertTransactionType = 'INSERT INTO transactionType (transactionId, time, type) VALUES ($1, $2, $3)';
					const insertTransactionTypeResult = await client.query(insertTransactionType, [TransactionQueryResultId.rows[0].id, time, type]);

					const updatingplayerWallet = 'UPDATE Wallet SET balance = $1 WHERE playerId = $2'
					const updatingPlayerWalletQuery =	await client.query(updatingplayerWallet, [newWalletAmount, playerId])

						await client.query('COMMIT')
					
								return 	{ message: "done", playerId: playerId, newAmount: newWalletAmount };
				} catch (e) {
						await client.query('ROLLBACK')
							return "error";
				} finally {
					client.release()
				}



}; /* end of function transaction */












export const transactionCheckModal = async (playerId:number, page:number, req: Request, res: Response): Promise<any> => {
      
     try {
			 const response: QueryResult = await pool.query('SELECT * FROM transaction WHERE playerid = $1', [playerId]);
				
				/* paginator functionality */
					const pageCount = Math.ceil(response.rows.length / 10);

         		page = (page > pageCount) ? (page = pageCount) : page;
							
							return res.status(200).json({
								"page": page,
								"pageCount": pageCount,
								"transactions": response.rows.reverse().slice(page * 10 - 10, page * 10)
							});

    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
        
    } /* end of try catch block */

}; /* end of transactionCheckModal */



