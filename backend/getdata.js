const csvtojson = require("csvtojson"); // npm install csvtojson
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@cluster0.auigosn.mongodb.net/?retryWrites=true&w=majority";
let dbName="dummy-data";
let colName= "dummy-node-data";
async function getData(databaseName, collectionName){
    const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1}); // establishing connection
    let tosend=[];
    try{
        await client.connect();
        const collection=client.db(databaseName).collection(collectionName);
        // Filter here- 
        let data = collection.find({$and: [
                {SCENARIO_ID: "2"},
                {PNODE_NAME: "UN.VICTORIA345 UVIC"},
                {LMP: '30.78'}
            ]
        }) 
        await data.forEach((obj)=>ans.push(obj))
      // return variable which stores all the data
        return tosend;
    }
    finally{
        await client.close()
    }
}

getData(dbName, colName)

module.exports=getData;


