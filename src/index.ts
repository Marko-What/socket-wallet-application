import express from "express"; 
const app = express();

import indexRoutes from "./routes/index";
import { socket } from './socket/socketsj';



// middlewares

app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.use(indexRoutes);

socket();




app.listen(3004); 
console.log("running");



