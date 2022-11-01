const router= require("express").Router()

//get: Returns Nodes according to a query
//TODO: Parse Query Fields for Prismas filtration object
//URL Query Form: /get?...
let filters={}
router.route('/').get((req, res, next)=>{
    const test = req.query
    let RESTful=req.RESTful.RESTful
    let collection=req.collection.collection
    console.log(test)
    // To figure out next is greater than less than
    let val=30.12
    let val2=30.10
    filters={
        where:
            {
                LMP: {
                    lte:val.toString(),
                    gte:val2.toString()
                }
                
            }
        }
    //assign("SCENARIO_ID", '2') //assign with query type and 
    //filters.where[fname] = '2'
    RESTful.Get(collection,filters).then(node => {
        res.send(node)
    }).catch(err=>res.status(400).json('Error: ' +err))
});

function assign(queryType, filterVal){
    filters.where[queryType]=filterVal;
}

module.exports=router