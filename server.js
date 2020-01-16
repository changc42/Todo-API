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

app.listen(PORT,()=>{
    console.log("listening on port "+ PORT);
})