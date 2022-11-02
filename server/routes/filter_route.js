const router= require("express").Router()

//get: Returns Nodes according to a query
//TODO: Parse Query Fields for Prismas filtration object
//URL Query Form: /get?...

// Filters is a JSON object. Whichever category needs a range component, needs to have an empty object inside the where part. For example, LMP
let filters={
    where:
        {
            LMP:{
            }
        }
    }
router.route('/').get((req, res, next)=>{
    const test = req.query
    let RESTful=req.RESTful
    let collection=req.collection
    let init=req.init
   // console.log(test)
    console.log(init)
    assign("SCENARIO_ID", '2') //assign with query type and 
    gtltFilter("LMP",33, 32)
    RESTful.Get(collection,filters).then(nodes => {
        res.send(nodes)
    }).catch(err=>res.status(400).json('Error: ' +err))
});

function assign(queryType, filterVal){
    filters.where[queryType]=filterVal;
}
// Push empty object if 
function gtltFilter(queryType, ltVal, gtVal){
     const gt="gt"
     const lt="lt"
     filters.where[queryType][lt]=ltVal.toString()
     filters.where[queryType][gt]=gtVal.toString()
}

module.exports=router