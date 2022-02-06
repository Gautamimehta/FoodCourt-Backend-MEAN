const router = require("express").Router();
const User = require("../model/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Data from frontend will be stored in backend from here
router.post("/register",async (req,res)=>{
    // if email id already exits in database 
    const emailExist = await User.findOne({
        email:req.body.email
    });
    if(emailExist) return res.status(400).send("Email Already Exists")

    // create new user
    const user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        acceptTandC:req.body.acceptTandC,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser) 
    } catch (error) {
        res.status(400).send(error)   
    }
});

router.post("/login",async (req,res)=>{
    // checking if user already register or not with help of email if present in database or not 
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Email not found")

    // id user exists now will check password
    const validPass =  compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send("Invalid Password");

    // create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({ token: token });

    function compare(string1,string2) {
        if(string1==string2) return true;
        else return false; 
    }
})

module.exports = router