"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const index_1 = __importDefault(require("./routes/index"));
const socketsj_1 = require("./socket/socketsj");
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/*
 try {
   app.use(express.json());
   app.use(express.urlencoded({extended: false}));
 } catch  {
   //ws.send("message: immediatelly");
        
   return;
 }
*/
app.use(index_1.default);
socketsj_1.socket();
app.listen(3004);
console.log("running");
