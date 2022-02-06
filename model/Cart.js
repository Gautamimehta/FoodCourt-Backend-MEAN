const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    id:Number,
    name:String,
    price:Number,
  });

module.exports = mongoose.model("Cart", CartSchema);