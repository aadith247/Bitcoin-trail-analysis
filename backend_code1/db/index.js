import { connect, Schema, model } from "mongoose";

connect('mongodb+srv://Aadithhya:Venkat%40123@cluster0.7lvh3qz.mongodb.net/sih');

const sch=new Schema({

    username : String,
    email: String,
    password: String,
    

});





export const user=model("user",sch);







