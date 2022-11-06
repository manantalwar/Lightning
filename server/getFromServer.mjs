import fetch from 'node-fetch'

const protocol = 'http://'
const serverUrl = 'localhost:'
const port = '3000'
const filterPath = '/filter'
const initPath = '/init'

/*
    Due to the asynchonous nature of http calls.
    We must handle our data within promises.
    GOOD: pullNodes().then((nodes) => console.log(nodes))
    BAD: console.log(pullNodes())
*/

//returns a promise of nodes pullnodes().then((data) => //do something) where data : [nodes]
async function pullNodes(query = ''){ 
    const url = protocol + serverUrl + port + filterPath + query
    return await fetch(url)
        .then((response) => response.json())
        .catch(error => {
            throw(error);
        })
}

//return promise of init obj
async function pullInit(){ 
    const url = protocol + serverUrl + port + initPath
    return await fetch(url)
        .then((response) => response.json())
        .catch(error => {
            throw(error);
        })
}


/*
returns a promise of aggregate field Object where Obj: {nodefield: [node1_val, ... , noden_val], nodefield2: [...] , ...}
Where Graph rendering code would look presumably something like:
aggregateNode(q).then((obj) => {
const graph = new Graph({
    x-axis:obj['PERIOD_ID']
    y-axis:obj['LMP']
})});
*/
async function aggregateNodes(query = ''){
    let obj = {}
    await pullNodes(query).then((data) => data.forEach((elem) => {
        for(let key in elem){
            if(!obj.hasOwnProperty(key)){obj[key] = []}
            else{
                obj[key].push(elem[key])
            }
        }
    }));
    return obj
}

const testQuery = '?LMP=or&LMP=30.01&LMP=30.12'

pullInit().then((obj) => console.log(obj))

pullNodes(testQuery).then((data) => console.log(data))

aggregateNodes(testQuery).then((obj) => console.log(obj))
