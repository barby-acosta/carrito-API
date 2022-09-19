const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);