import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Aadithhya:Venkat%40123@cluster0.7lvh3qz.mongodb.net/sih", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))

const ID_data_Schema = new mongoose.Schema({
    ID:{
        required: true,
        unique: true,
        type: String
    },
    received_amount: {
        type: Number,
        default: 0,
    },
    send_amount: {
        type: Number,
        default: 0,
    },
    received_count: {
        type: Number,
        default: 0,
    },
    send_count: {
        type: Number,
        default: 0,
    },
    frequency: {
        type: Number,
        default: 1,
    },
    
});


export const id_data = mongoose.model("ID_data", ID_data_Schema);

