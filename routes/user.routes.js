const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const {UserModel} = require("../models/User.model")

const userController = Router();

userController.post("/signup", (req, res) => {
    const{email,password} = req.body;
    bcrypt.hash(password, 5, async function(err, hash){
        if(err){
            res.send("somthing went wrong");
        }
        const user = new UserModel({
            email,
            password: hash
        })
        try{
            await user.save()
            res.json({msg: "Signup Sucessfull !!"})
        }catch(err){
          console.log("Somthing went wrong, try again")
          console.log(err);
        }
    });
});

userController.post("/login", async(req, res) => {
   const {email, password} = req.body;
   const user = await UserModel.findOne({email});
   const hash = user.password;
   bcrypt.compare(password, hash, function(err, result) {
    if(err){
        res.send("Somthing went wrong, login again")
    }
    if(result){
        const token = jwt.sign({userId: user._id}, process.env.SECRET);
        res.json({msg: "Login Sucessfull !!", token})
    }
    else{
        res.send("Invalid User Please sign up first")
    }
   });
});

module.exports= {
    userController
}