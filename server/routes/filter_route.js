const router = require("express").Router()

//get: Returns Nodes according to a query
//TODO: Parse Query Fields for Prismas filtration object
//URL Query Form: /get?...

// Filters is a JSON object. Whichever category needs a range component, needs to have an empty object inside the where part. For example, LMP
//

router.route('/').get((req, res, next)=>{
    const q = req.query
    let RESTful=req.RESTful
    let collection=req.collection
    let init=req.init

    let filters = {
        where:{
            AND:[] //[{OR:[{LMP:'30.1'},{LMP:'30.2'}]},{SCENARIO_ID:1}]
        }
    }

    //UNPACKS Potentially nested fields with a base pointer/nested pointer/and corrected field name
    function unpack(field){
        let obj = {}
        let pointer = obj

        let arr = field.split('/')
        let fieldname = arr[arr.length - 1]

        arr.forEach((elem) => {
            if(elem != fieldname){
                assign(pointer, elem, {})
                pointer = pointer[elem]
            }
        })

        return [obj, pointer, fieldname]
    }

    //assign(filters,"SCENARIO_ID", '2')
    // THIS HANDLES NUMBERS /filter?field=val returns every entry where field == val
    // /filter?field=val&field=val2 returns every entry where val <= field <= val2 extra values ignored
    // /filter?field=OR&field=val&field=val2... returns every entry where field == val OR field == val2 OR ... any extra values
    // NOW WORKS WITH COMPOUND SELECTION THANKS TO AND:[]
    for(key in q){
        if(!init.hasOwnProperty(key)){continue;}
        let unpacked = unpack(key.toString()) //unpack field (potentially nested)
        let toPush = unpacked[0]
        let empty = unpacked[1]
        key = unpacked[2]
        if(init[key].toString() == "number"){ //Handles Fields that are numbers 
            if(typeof(q[key]) == "object"){
                if(q[key][0].toLowerCase() == 'or'){ //Select field list of potential vals
                    let orObj = {OR:[]}
                    q[key].forEach((elem) => {
                        if(!isNaN(elem)){
                            assign(empty, key.toString(), elem)
                            orObj.OR.push({ ...toPush })
                        }
                    });
                    filters.where.AND.push(orObj)
                } else if(!isNaN(q[key][0]) && !isNaN(q[key][1])){ //Range of vals (2, start and end)
                    gtltFilter(empty, key.toString(), q[key][0], q[key][1])
                    filters.where.AND.push(toPush)
                }
            } else { // ONE val
                if(!isNaN(q[key])){
                    assign(empty, key.toString(), q[key])
                    filters.where.AND.push(toPush)
                }
            }
        } else if(init[key].toString() == "boolean"){ //handles bools
            if(typeof(q[key]) == "string"){ //accepts 1 val
                assign(empty, key.toString(), q[key])
                filters.where.AND.push(toPush)
            }
        } else if(init[key].toString() == "string"){ //handles strings
            if(typeof(q[key]) == "string"){  //one val
                assign(empty, key.toString(), q[key])
                filters.where.AND.push(toPush)
            }
            else if(typeof(q[key]) == "object"){  //list of vals
                let orObj = {OR:[]}
                q[key].forEach((elem) => {
                    assign(empty, key.toString(), elem)
                    orObj.OR.push({ ...toPush })
                });
                filters.where.AND.push(orObj)
            }
        } else if(init[key].toString() == "date"){ //PARSES DATES : CHECK THIS FUNCTIONALITY
            if(typeof(q[key]) == "object"){ //Only accepts range
                let start = new Date(q[key][0])
                let end =   new Date(q[key][1])
                if(!isNaN(start) && !isNaN(end)) {
                    gtltFilter(empty, key.toString(), start, end)
                    filters.where.AND.push(toPush)
                }
            }
        }
    }

    console.log(q)
    console.log(JSON.stringify(filters))

    RESTful.Get(collection, filters).then(nodes => {
        res.send(nodes)
    }).catch(err=>res.status(400).json('Error: ' + err))
});

//assigns key/val pair to object
function assign(obj, queryType, filterVal){
    obj[queryType]=filterVal;
}

//assigns qt lt prisma object query to some object
function gtltFilter(obj, queryType, gtVal, ltVal){
    obj[queryType] = {
        gte:gtVal.toString(),
        lte:ltVal.toString()
    }
}

module.exports=router