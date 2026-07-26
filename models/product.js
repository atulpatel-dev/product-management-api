const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema  = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,     
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;