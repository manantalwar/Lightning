const express= require("express");
const RESTful = require("./prisma/RESTful.js");
const app=express();
app.listen(3013) // localhost for now
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
    RESTful.GetOne(collection).then(node => {

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

const homepage_router=require('./routes/home_route')
const filterPage_router=require('./routes/filter_route')
const validationPage_router=require('./routes/validation_route')

app.use('/filter', function(req, res, next){
    req.RESTful={RESTful}
    req.collection={collection}
    next()
},filterPage_router)


