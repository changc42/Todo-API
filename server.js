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
    let filteredTasks = {...todos}
    if(req.query.hasOwnProperty("completed")){
        let isCompleted = req.query.completed=='true'?true:false
        filteredTasks = _.where(filteredTasks,{completed: isCompleted})
    }
    if(req.query.hasOwnProperty("description")){
        filteredTasks = _.filter(filteredTasks,e=>e.description.indexOf(req.query.description)>=0)
    }
    res.json(filteredTasks)
})

app.get("/todos/:id",(req,res)=>{
    let matchedTodo = _.findWhere(todos, {id:req.params.id});
    if(matchedTodo){
        res.json(matchedTodo);
    }
    else res.status(404).send()
})

app.post("/todos",(req,res)=>{
    let body = _.pick(req.body,'description','completed');
    
    if(!_.isString(body.description) || body.description.trim().length===0 || !_.isBoolean(body.completed)){
        res.status(400).send()
    }
    else{
        body.id = todoNextId++;
        todos.push(body)
        res.json(todos)
    }
})

app.delete("/todos/:id",(req,res)=>{
    console.log(typeof parseInt(req.params.id))
    let deleted = _.findWhere(todos, {id:parseInt(req.params.id)})
    todos = _.without(todos, deleted)
    res.json(deleted)
})

app.put("/todos/:id",(req,res)=>{
    let matchedTodo = _.findWhere(todos,{id:parseInt(req.params.id)})
    let deleted = {...matchedTodo}
    if(matchedTodo){
        _.extend(matchedTodo,req.body)
        res.send(JSON.stringify(deleted) + "\nchanged to \n" + JSON.stringify(matchedTodo))
    }
    else res.send("specified id does not exist")
})

app.listen(PORT,()=>{
    console.log("listening on port "+ PORT);
})