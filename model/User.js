const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    phone:Number,
    password:String,
    confirmPassword:String,
    acceptTandC:String,
});

module.exports=mongoose.model("User",userSchema);