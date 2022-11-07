const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const {TodoModel} = require("../models/Todo.Model");

const todoControler = Router();

todoControler.get("/", async(req, res) => {
    const {tag} = req.query;
    const todos = await TodoModel.find({userId: req.body.userId, tag});
    res.send(200).send(todos)
});

todoControler.post("/create", async(req, res) => { 
   const {taskname, status, tag, userId } = req.body;
   const todo = new TodoModel({
    taskname, 
    status, 
    tag, 
    userId
   }) 
   try{
    await todo.save();
    res.status(200).send("Todo Added !!")
   }
   catch(err){
    res.status(502).send("Somthing went wrong !!")
   }
});

todoControler.delete("/delete/:todoId", async(req, res) => {
    const {todoId} = req.params
    const deleteTodo = await TodoModel.findOneAndUpdate({_id: todoId, userId: req.body.userId})
    if(deleteTodo){
        res.status(200).send("Todo Deleted Sucessfully !!")
    }
    else{
        res.status(502).send("Not deleted")
    }
})

todoControler.patch("/edit/:todoId", async(req, res) => {
    const {todoId} = req.params
    const editTodo = await TodoModel.findOneAndUpdate({_id: todoId, userId: req.body.userId}, req.body)
    if(editTodo){
        res.status(200).send("update sucessfull !!")
    }
    else{
        res.status(502).send("Not able to update")
    }
})

module.exports= {
    todoControler
}