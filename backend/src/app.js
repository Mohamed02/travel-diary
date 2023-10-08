import  express from "express";
import mongoose from "mongoose";
import postRouter from "./routing/post-routes";
// import dotenv from 'dotenv';
import userRouter from './routing/user-routes';
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use("/post",postRouter);

mongoose.connect("mongodb://127.0.0.1:27017/travel_diaries")
.then(()=>{
    console.log("Mongo connection successfull")
}).catch((err)=>{
    console.log(err);
});

app.listen(5000,()=>{
    console.log("Listenting to localhost:5000");
});
