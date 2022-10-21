const express= require("express");
const getData = require("./getdata");
const app=express();
app.listen(3000) // localhost for now
let dbName="dummy-data";
let colName= "dummy-node-data";


//express route-
app.get('/', (req, res, next)=>{
    getData(dbName, colName).then( function(data){
        
        //Pulls all keys, and their types, from the first node
        let keys = {};
        exclude = [] //['PERIOD_ID',"SCENARIO_ID"]
        Object.keys(data[0]).forEach( function(key) {
            if(!keys.hasOwnProperty(key)){
                if(typeof(data[0][key]) == "string" && !isNaN(data[0][key]) && !exclude.includes(key)){ //Identifies Numbers
                    keys[key] = typeof(1);
                } else if (data[0][key] == true || data[0][key] == false || data[0][key] == "true" || data[0][key] == "false"){ //Identifies Booleans
                    keys[key] = typeof(true);
                } else if (!isNaN(Date.parse(data[0][key]))){ //Identifies Dates
                    keys[key] = "date";
                } else { //Otherwise we interpret as a string
                    keys[key] = "string";
                }
            }
        });

        res.send([data,keys])
    })
});
