import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Aadithhya:Venkat%40123@cluster0.7lvh3qz.mongodb.net/sih")





const Source_data_Schema = new mongoose.Schema({
    Source: {
        type: String,
        required: true,
        unique: true
    },
    transactions: [
        {
            // INDEX, FROM, TO, AMOUNT, CATEGORY, SUMMARY, TIMESTAMP
            index: {
                type: String,
                required: true
            },
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            summary: {
                type: String,
                required: true
            },
            timestamps: {
                type: String,
                required: true
            },

        }

    ]
});

export const source_data = mongoose.model("Source_data", Source_data_Schema);



