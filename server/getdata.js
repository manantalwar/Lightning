const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:adminpassword@cluster0.auigosn.mongodb.net/?retryWrites=true&w=majority";
async function getData(databaseName, collectionName){
    const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1}); // establishing connection
    let tosend=[];
    let filters=[]
    try{
        await client.connect();
        const collection=client.db(databaseName).collection(collectionName);
        // Filter here- 
        filters.push({SCENARIO_ID: "2"})
        filters.push({PNODE_NAME: "UN.VICTORIA345 UVIC"})
        let data = collection.find({$and: filters
        }) 
        // greater than and less than filters as well
        await data.forEach((obj)=>tosend.push(obj))
      // return variable which stores all the data
        return tosend;
    }
    finally{
        await client.close()
    }
}
module.exports=getData;


