const csvtojson = require("csvtojson"); // npm install csvtojson
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@cluster0.auigosn.mongodb.net/?retryWrites=true&w=majority";
// let path= "dummy-node-data.csv";
// let dbName="dummy-data";
// let colName= "dummy-node-data";
// Add your IP to mongo database !!!! Otherwise you will see some topology error

function upload(localfilePath, databaseName, collectionName, uri){
    csvtojson() //converting csv file to JSON. To upload CSV file directly- we can us mongoimport. 
    .fromFile(localfilePath)
    .then(csvData => {
        const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1}); // establishing connection 
        const collection = client.db(databaseName)
            .collection(collectionName)
            .insertMany(csvData, {safe:true} , (err, res) => {
                       if (err) throw err;
            })
      client.close(); // Issue 1- connection not closing. Need to force quit
      });
}

//upload(path, dbName, colName, uri)

//Some things I found interesting-
//1. Unified Topology paradigm moves away from the concept of "connecting" and instead simply sets up a connection string and begins doing operations. 
//Each operation then fails or succeeds depending on whether the driver can reach a server at the time that operation is executed.
//2. MongoDB driver has deprecated their current connection string parser. 
//Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.

