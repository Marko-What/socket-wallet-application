import {Router} from 'express';
const router = Router();

import { walletCreate, walletDeposit, walletWithdraw, transactionCheck, transactionTypeCheck } from '../controllers/index.controller';



router.post('/wallet', walletCreate);
router.post('/deposit', walletDeposit);
router.post('/withdraw', walletWithdraw);

router.get('/history/:playerid?/:page?', transactionCheck);






export default router;
