var express = require("express");
var app = express();
var PORT = process.env.PORT || 3500;

var todos = [{
    id: 1,
    description: "walk the fish",
    completed: false,
},{
    id:3,
    description: "world domination",
    completed: false,  
}]

app.get("/",(req,res)=>{
    res.send("todo API root")
})

app.get("/todos",(req,res)=>{
    res.json(todos)
})

app.get("/todos/:id",(req,res)=>{
    let matchedTodo;
    todos.forEach(e=>{
        if(e.id==req.params.id) matchedTodo = e;
    })
    if(matchedTodo){
        res.json(matchedTodo);
    }
    else res.status(404).send()
})

app.listen(PORT,()=>{
    console.log("listening on port "+ PORT);
})