const router = require("express").Router()

router.route('/*').get((req, res, next)=>{
    const p = req.path
    let RESTful=req.RESTful
    let collection=req.collection
    let init=req.init

    if(!Object.keys(init).includes(p.slice(1))){
        res.status(404).json('Error: Unknown Request');
    } 
    else if (!p.slice(1).includes("/")) { //Data is in Node and not nested DB has exclude funcctionality!
        let filters = {
            distinct: [p.slice(1)],
            select: {},
        }

        filters.select[p.slice(1)] = true;

        RESTful.Get(collection, filters).then((nodes)  => {
            let arr = []
            nodes.forEach((elem) => { arr.push(elem[p.slice(1)]) })
            res.send(arr)
        }).catch(err => res.status(400).json('Error: ' + err))
        
    } else { //Else the data is nested within a relational field and we must iterate to exclude dupilcates
             //Also unpack nested data and aggregate

        function unpack(field){
            let obj = {}
            let pointer = obj
    
            let arr = field.split('/')
            let fieldname = arr[arr.length - 1]
    
            arr.forEach((elem) => { //creates the nested select query for linked db objects
                if(elem != fieldname){
                    pointer[elem] = { select : {} };
                    pointer = pointer[elem].select;
                }
            })
            pointer[fieldname] = true;

            return [obj , arr , fieldname]
        }

        let obj = unpack(p.slice(1));
        
        let filters = {
            select: obj[0],
        }

        RESTful.Get(collection, filters).then((nodes) => { //de dupes the nested query result
            let arr = []                                   //discarding null sub objects
            nodes.forEach((elem) => {
                try{
                    let temp = elem[obj[1][0]];
                    for(let i = 1; i < obj[1].length; i++){
                        temp = temp[obj[1][i]];
                    }
                    if(!arr.includes(temp)){arr.push(temp)}
                } catch (err) {} 
            })
            res.send(arr)
        }).catch(err => res.status(400).json('Error: ' + err))
    }
});

module.exports=router