const express= require("express");
const getData = require("./getdata");
const app=express();
app.listen(3000) // localhost for now
let dbName="dummy-data";
let colName= "dummy-node-data";

//express route-
app.get('/', (req, res, next)=>{
    getData(dbName, colName).then(
        (data)=>res.send(data)
    )
});