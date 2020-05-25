"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const index_controller_1 = require("../controllers/index.controller");
/*
import { walletCreate, walletWithdraw, walletDeposit, walletHistory } from '../controllers/index.controller';

router.post('/wallet', walletCreate);
router.post('/withdraw', walletWithdraw);
router.post('/deposit', walletDeposit);
router.get('/history', walletHistory);
*/
router.get('/test', (req, res) => res.send("hellow"));
router.post('/wallet', index_controller_1.walletCreate);
router.post('/deposit', index_controller_1.walletDeposit);
router.post('/withdraw', index_controller_1.walletWithdraw);
router.get('/history/:playerid?', index_controller_1.transactionCheck);
router.get('/transactionCheck', index_controller_1.transactionCheck);
router.get('/transactionTypeCheck', index_controller_1.transactionTypeCheck);
exports.default = router;
