const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    id:Number,
    name:String,
    price:Number,
    tags:Array,
    stars:Number,
    imageUrl:String,
    origins:Array,
    cookTime:String,
});

module.exports=mongoose.model("Listing",listingSchema);