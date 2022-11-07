const express = require("express");
const cors = require("cors");
const {connection }= require("./config/db");
const {userController} = require("./routes/user.routes")
const {todoControler} = require("./routes/todo.routes");
const {authantication} = require("./middlewares/authantication")

const app = express();
app.use(express.json());
const PORT = 8080;



app.get("/", (req, res) => {
    res.send("Home page")
})

app.use(cors())

app.use("/user", userController);
app.use(authantication);
app.use("/todos", todoControler);




app.listen(PORT, async() => {
    try{
        await connection;
        console.log("db connected")
    }
    catch(err){
        console.log("no connected")
        console.log(err)
    }
    console.log(`app listing on port http://localhoat:${PORT}`);
})