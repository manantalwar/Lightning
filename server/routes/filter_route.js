const router= require("express").Router()

//get: Returns Nodes according to a query
//TODO: Parse Query Fields for Prismas filtration object
//URL Query Form: /get?...
router.route('/').get((req, res, next)=>{
    const test = req.query
    let RESTful=req.RESTful.RESTful
    let collection=req.collection.collection
    console.log(test)
    filters={}
    RESTful.Get(collection,filters).then(node => {
        res.send(node)
    }).catch(err=>res.status(400).json('Error: ' +err))
});

module.exports=router