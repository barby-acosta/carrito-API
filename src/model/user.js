const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
  },
  carritos: 
  [{ type: mongoose.Schema.ObjectId, ref: 'Basket' }],
});

module.exports = mongoose.model("User", UserSchema);