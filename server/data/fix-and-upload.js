const csvtojson = require("csvtojson"); // npm install csvtojson
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:adminpassword@cluster0.auigosn.mongodb.net/?retryWrites=true&w=majority";
let path= "dummy-node-data2.csv"; //Changed this and following field for each table
let colName= "dummy-node-data"; //<--
let dbName="dummy-data-fixed";

// Add your IP to mongo database !!!! Otherwise you will see some topology error (made public)

function upload(localfilePath, databaseName, collectionName, uri){
    csvtojson() //converting csv file to JSON. To upload CSV file directly- we can us mongoimport. 
    .fromFile(localfilePath)
    .then(csvData => {
        csvData.forEach((elem) => {
            if(path === "dummy-node-data2.csv"){ elem["PERIOD_ID"] =  new Date(elem["PERIOD_ID"] + ": UTC") } //Correct Dates SPECIFY UTC
        });
        console.log(csvData)
        
        const client = new MongoClient(uri, { useUnifiedTopology: true,  useNewUrlParser: true, wtimeoutMS: 2500, keepAlive:true, maxPoolSize:30, socketTimeoutMS:360000, connectTimeoutMS:360000}); // establishing connection 
            const collection = client.db(databaseName)
            .collection(collectionName)
            .insertMany(csvData.slice(), {safe:true} , (err, res) => {
                if (err) throw err;
            })
        client.close(); // Issue 1- connection not closing. Need to force quit
      });
}

upload(path, dbName, colName, uri)

//Some things I found interesting-
//1. Unified Topology paradigm moves away from the concept of "connecting" and instead simply sets up a connection string and begins doing operations. 
//Each operation then fails or succeeds depending on whether the driver can reach a server at the time that operation is executed.
//2. MongoDB driver has deprecated their current connection string parser. 
//Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.

