const jwt = require("jsonwebtoken");
require("dotenv").config()


const authantication = (req, res, next) => {
    if(!req.headers.authantication){
        return res.status(502).send("Please login Again !!")
    }
    const token = req.headers.authantication.split(" ")[1]
    jwt.verify(token, process.env.SECRET, function(err, decoded){
        if(err){
            res.send("Please login Again !!")
        }
        else{
            req.body.userId = decoded.userId
            next()
        }
    })
}

module.exports = {authantication};