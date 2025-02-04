import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./routes/Route.js";
import cors from "cors";


const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 7000;
const MONGO = "mongodb://localhost:27017/CRUD";

mongoose.connect(MONGO)
.then(()=> {
    console.log("hai Mongo")
    app.listen(PORT,()=> {
    console.log(`succesfully running" ${PORT}`)
    })
})
.catch((error)=> {
    console.log(error);
})


app.use("/api",route)