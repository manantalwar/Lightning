const express= require("express");
const RESTful = require("./prisma/RESTful.js");

const Ip = 'localhost'
const port = 3001
const app=express();
app.listen(port, Ip)

const collection = "dummy_node_data"
/*
FOR ISO-NE:
THE FORMAT OF THIS INCLUDE OBJECT TAKES THE FORM OF THE RELATIONSHIPS
IN THE PRISMA SCHEMA
*/
const include={
    Generator:true,
    Scenario: {
        include:{
            Group: true,
        }
    },
}

//Function returning the type of a field
function getType(field){
    if(typeof(field) == "string" && !isNaN(field)){ //Identifies Numbers
        return typeof(1);
    } else if (field == true || field == false || field == "true" || field == "false"){ //Identifies Booleans
        return typeof(true);
    } else { //Otherwise we interpret as a string or object or date
        if(!isNaN(new Date(field.toString()))){return "date";}
        return typeof(field);
    }
}

//Pulls all keys, and their types, from the first node, recursively for nested objects
function classify(obj){
    let keys = {}
    Object.keys(obj).forEach(function(key) {
        if(!keys.hasOwnProperty(key) && obj[key] != null && obj[key] != undefined){
            keys[key.toString()] = getType(obj[key])
            //console.log(key + " : " + getType(obj[key]))
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


//init: Function supplies data for the Client For Filtration Initilization
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

async function init(){
    let InitFilter = {
        include:include,
    }
    return await RESTful.Get(collection, InitFilter).then(nodes => {
        temp = {}
        nodes.forEach((elem) => {
            temp = {
                ...temp,
                ...classify(elem),
            }
        })
        return temp;
    })
}

init().then((elem) => server(elem))

function server(init) {

    app.get('/init', async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send(init)
    });

    const homepage_router = require('./routes/home_route')
    const filterPage_router = require('./routes/filter_route')
    const validationPage_router = require('./routes/validation_route')
    const getPage_router = require('./routes/get_route')

    app.use('/filter', async function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        req.RESTful = RESTful
        req.collection = collection
        req.include = include
        req.init = init

        next()
    }, filterPage_router)


    app.use('/get', async function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        req.RESTful = RESTful
        req.collection = collection
        req.include = include
        req.init = init

        next()
    }, getPage_router)

}