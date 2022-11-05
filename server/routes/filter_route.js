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
    //console.log(test)
    let filters = {
        where:{
            AND:[] //{OR:[{LMP:'30.1'},{LMP:'30.2'}]},{SCENARIO_ID:1}]
        }
    }

    //assign(filters,"SCENARIO_ID", '2')
    // THIS HANDLES NUMBERS /filter?field=val returns every entry where field == val
    // /filter?field=val&field=val2 returns every entry where val <= field <= val2
    // /filter?field=SELECT&field=val&field=val2... returns every entry where field == val OR field == val2
    // /NOW WORKS WITH COMPOUND SELECTION
    for(key in q){
        if(!init.hasOwnProperty(key)){continue;}
        if(init[key].toString() == "number"){ 
            if(typeof(q[key]) == "object"){
                if(q[key][0].toLowerCase() == 'select'){
                    let obj = {OR:[]}
                    q[key].forEach((elem) => {
                        if(!isNaN(elem)){
                            let obj2 = {}
                            obj2[key.toString()] = elem
                            obj.OR.push(obj2)
                        }
                    });
                    filters.where.AND.push(obj)
                }else{
                    let obj = {}
                    gtltFilter(obj, key.toString(), q[key][0], q[key][1])
                    filters.where.AND.push(obj)
                }
            }
            else{
                if(!isNaN(q[key])){
                    let obj = {}
                    assign(obj, key.toString(), q[key])
                    filters.where.AND.push(obj)
                }
            }
        }
    }
    
    console.log(q)
    console.log(filters)

    RESTful.Get(collection, filters).then(nodes => {
        res.send(nodes)
    }).catch(err=>res.status(400).json('Error: ' +err))
});

function assign(obj, queryType, filterVal){
    obj[queryType]=filterVal;
}

// Push empty object if 
function gtltFilter(obj, queryType, gtVal, ltVal){
    obj[queryType] = {
        gte:gtVal.toString(),
        lte:ltVal.toString()
    }
}

module.exports=router