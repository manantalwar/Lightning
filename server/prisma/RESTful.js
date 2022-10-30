const express= require("express");
const prismadb = require("./prismadb.js");
const app=express();
app.listen(3000) // localhost for now

const collection = "dummy_node_data"

//init: This Route supplies data to the Client For Filtration Initilization
/*
Take the object:
{
    name: "name",
    test: {
        field1: 1
        field2: "true"
    }
}
Our Route Should Return:
{
    name: "string"
    test: "object"
    test/field1: "number"
    test/field2: "boolean"
}
With form: obj1/obj2/.../objn/fieldname: "type"
For Fields within n objects
*/
app.get('/init', (req, res, next)=>{
    prismadb.prismaGetOne(collection).then(node => {

        //Function returning the type of a field
        function getType(field){
            if(typeof(field) == "string" && !isNaN(field)){ //Identifies Numbers
                return typeof(1);
            } else if (field == true || field == false || field == "true" || field == "false"){ //Identifies Booleans
                return typeof(true);
            } else if (!isNaN(Date.parse(field))){ //Identifies Dates
                return "date";
            } else { //Otherwise we interpret as a string or object
                return typeof(field);
            }
        }
    
        //Pulls all keys, and their types, from the first node, recursively for nested objects
        function classify(obj){
            let keys = {}
            Object.keys(obj).forEach(function(key) {
                if(!keys.hasOwnProperty(key)){
                    keys[key] = getType(obj[key])
                    if(keys[key] == "object"){
                        sub = classify(obj[key])
                        Object.keys(sub).forEach(function(skey) {
                            let nkey = key + "/" + skey;
                            keys[nkey] = sub[skey];
                        })
                    }
                }
            });
            return keys
        }

        res.send(classify(node))
    })
});


//get: Returns Nodes according to a query
//TODO: Parse Query Fields for Prismas filtration object
//URL Query Form: /page?...
app.get('/get', (req, res, next)=>{
    const test = req.query
    console.log(test)

    filters = {}
    prismadb.prismaGet(collection,filters).then(node => {
        res.send(node)
    })
});
