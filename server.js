var express = require("express");
var app = express();
var PORT = process.env.PORT || 3500;

app.get("/",(req,res)=>{
    res.send("todo API root")
})

app.listen(PORT,()=>{
    console.log("listening on port "+ PORT);
})