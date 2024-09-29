import express, { json } from "express";
const port=3000;

const app=express();
import cors from 'cors';
import userRouter from "./router/user.js";

app.use(cors());
app.use(json());
app.use("/user",userRouter);






app.listen(3000);