const express= require("express");
const getData = require("./getdata");
const app=express();
app.listen(3000)
let dbName="dummy-data";
let colName= "dummy-node-data";
console.log("new")
app.get('/', (req, res, next)=>{
    console.log("here");
    //data.forEach(res.send);
    console.log(typeof(data))
    getData(dbName, colName).then(
        (data)=>res.send(data)
    )
});