var express = require("express");
var bodyParser = require('body-parser')
var _ = require('underscore')

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
    let matchedTodo = _.findWhere(todos, {id:req.params.id});
    if(matchedTodo){
        res.json(matchedTodo);
    }
    else res.status(404).send()
})

app.post("/todos",(req,res)=>{
    let body = req.body;
    
    if(!_.isString(body.description) || body.description.trim().length===0){
        res.status(400).send()
    }
    else{
        body.id = todoNextId++;
        todos.push(_.pick(body,'description', 'id'))
        res.json(todos)
    }
})

app.delete("/todos/:id",(req,res)=>{
    console.log(typeof parseInt(req.params.id))
    let deleted = _.findWhere(todos, {id:parseInt(req.params.id)})
    todos = _.without(todos, deleted)
    res.json(deleted)
})

app.listen(PORT,()=>{
    console.log("listening on port "+ PORT);
})