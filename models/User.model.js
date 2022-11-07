const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_id: {type: Number},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const UserModel = mongoose.model("users", userSchema);
module.exports={UserModel};