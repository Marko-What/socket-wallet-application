"use strict";
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
const databaseTests_1 = require("./databaseTests");
const client = databaseTests_1.pool.connect();
const dmodal_1 = require("../dmodal/dmodal");
describe("dmodal test", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield dmodal.remove({});
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield dmodal.remove({});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield dmodal.remove({});
    }));
    /* consider closing connection */
    /*afterAll(async () => {
            await dmodal.remove({});
    });*/
    it("has a dmodal", () => {
        //	expect(dmodal).toBeDefined();
    });
    /* testing transaction functionality */
    let type = "start deposit";
    let playerId = 1;
    let amount = 444;
    let datetime = "2020-5-21";
    describe("walletCreationTransaction", () => {
        it("walletCreationTransaction", () => __awaiter(void 0, void 0, void 0, function* () {
            yield dmodal_1.transaction(playerId, null, amount, type, Request, Response, datetime);
            const selectWalletQuery = 'SELECT * FROM Wallet WHERE playerId = $1';
            let selectWalletResult = yield client.query(selectWalletQuery, [playerId]);
            const expected = playerId;
            expect(selectWalletResult.rows[0].playerId).toEqual(expected);
        }));
    }); /* end of wallet CreationTransaction */
    describe("normalTransaction", () => {
        let type = "deposit";
        let time = "2020-5-21";
        it("normalTransaction", () => __awaiter(void 0, void 0, void 0, function* () {
            yield dmodal_1.transaction(playerId, time, amount, type, Request, Response, null);
            const selectTransactionQuery = 'SELECT * FROM transaction WHERE playerId = $1';
            let selectTransactionQueryResult = yield client.query(selectWalletQuery, [playerId]);
            const expected = playerId;
            expect(selectTransactionQueryResult.rows[0].playerId).toEqual(expected);
        }));
    }); /* end of wallet CreationTransaction */
    /* testing retrieving results */
    describe("transactionCheckModal -- > get history transaction by playerId", () => {
        it("retrieve by playerId", () => __awaiter(void 0, void 0, void 0, function* () {
            const results = yield dmodal_1.transactionCheckModal(playerId, page, Request, Response);
            const expected = playerId;
            expect(results.rows[0].playerId).toEqual(expected);
        }));
    });
}); /* end of describe */
