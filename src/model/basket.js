const mongoose = require("mongoose");

const BasketSchema = new mongoose.Schema({
    estado: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: false,
        default:0.0
    },
    productos:
        [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
});

module.exports = mongoose.model("Basket", BasketSchema);