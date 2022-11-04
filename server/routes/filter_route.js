const router = require("express").Router()

//get: Returns Nodes according to a query
//TODO: Parse Query Fields for Prismas filtration object
//URL Query Form: /get?...

// Filters is a JSON object. Whichever category needs a range component, needs to have an empty object inside the where part. For example, LMP

router.route('/').get((req, res, next)=>{
    const q = req.query
    //console.log(q)
    let RESTful=req.RESTful
    let collection=req.collection
    let init=req.init
    //console.log(test)
    let filters = {
        where:{

        }
    }

    //assign(filters,"SCENARIO_ID", '2')

    for(key in q){
        if(init[key].toString() == "number"){
            if(typeof(q[key]) == "object"){
                console.log(q[key])
                gtltFilter(filters, key.toString(), q[key][0], q[key][1])
            }
            else{
                if(!isNaN(q[key])){
                    assign(filters, key.toString(), q[key])
                }
            }
        }
    }
    console.log(filters)
    RESTful.Get(collection, filters).then(nodes => {
        res.send(nodes)
    }).catch(err=>res.status(400).json('Error: ' +err))
});

function assign(obj, queryType, filterVal){
    obj.where[queryType]=filterVal;
}

// Push empty object if 
function gtltFilter(obj, queryType, gtVal, ltVal){
    obj.where[queryType] = {
        gt:gtVal.toString(),
        lt:ltVal.toString()
    }
    //[lt.toString()] = 
    //obj.where[queryType][gt.toString()] = 
}

module.exports=router