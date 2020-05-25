import { Request, Response } from 'express';

import { pool } from '../database';
import { QueryResult } from 'pg';
import { transaction, transactionCheckModal } from '../dmodal/dmodal';
import { schemaA, schemaB, schemaC  } from '../dmodal/schema';

import { transactionErrorHandler } from '../error/errorHandler';

const Joi = require('joi');






export const walletCreate = (req: Request, res: Response) => {
   
		const type ="start deposit";

		Joi.validate(req.body, schemaA, (err:any, valid:any) => {
				if(err){	
					return res.status(200).json("err: "+err);
				}
				if(valid){	
				 const { playerId, datetime, amount} = req.body;	
			
			  		transaction(playerId, null, amount, type, req, res, datetime).then((result)=>{	
									transactionErrorHandler(result, playerId, res);
								
						});/* end of transaction */

				}/*end of if valid */
		})/* end of data validation function  */
}; /* end of walletCreate */




		/* returning promises should be considered using asnyc function keyword */

export const walletWithdraw = (req: Request, res: Response) => {

		const type = "withdraw";

		Joi.validate(req.body, schemaB, (err:any, valid:any) => {
				if(err){	
					return res.status(200).json("err: "+err);
				}
				if(valid){	
					const { playerId, time, amount } = req.body;

							transaction(playerId, time, amount, type, req, res, null).then((result)=>{	
										transactionErrorHandler(result, playerId, res);
							});/* end of transaction */	

				} /* end of if valid */
		}) /* end of data validation function  */
			
};/* end of walletWithdraw */








export const walletDeposit = async (req: Request, res: Response) => {
		
		const type = "deposit";


		Joi.validate(req.body, schemaB, (err:any, valid:any) => {
				if(err){		
					return res.status(200).json("err: "+err);
				}/*end of if(err) */

				if(valid){
			    const { playerId, time, amount } = req.body;

			  	transaction(playerId, time, amount, type, req, res, null).then((result)=>{	
									transactionErrorHandler(result, playerId, res);
					});  /* end of transaction */

				}/*end of if(valid) */

		}) /* end of data validation function  */
};/*end of walletDeposit */












export const transactionCheck =  async (req: Request, res: Response) => {
		

		Joi.validate(req.params, schemaC, (err:any, valid:any) => {
				if(err){
					return res.status(200).json("err: "+err);
				}
				if(valid){	

					const playerId = parseInt(req.params.playerid); 
		 				let page = (parseInt(req.params.page)) ? parseInt(req.params.page) : 1;

						   transactionCheckModal(playerId, page, req, res).then((result)=>{
									if(result == "error"){  
								    	return res.status(400).json('Internal Server error');		
									} else {
											res.json(result);				
									}
							});/*end of walletDepositModal */
				}/*end of valid */
		})  /* end of data validation function  */
};/* end of transaction check*/












