var express = require("express");
var bodyParser = require('body-parser')
var app = express();
var PORT = process.env.PORT || 3500;

app.use(bodyParser.json())

var todos = []
var todoNextId = 1;

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

app.post("/todos",(req,res)=>{
    req.body.id = todoNextId++;
    todos.push(req.body)
    res.json(todos)
})

app.listen(PORT,()=>{
    console.log("listening on port "+ PORT);
})