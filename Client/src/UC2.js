import Navbar from "./Navbar"
import './UC2.css'
import {aggregateNodes, pullNodes} from './getFromServer.mjs'
import { useLocation } from "react-router-dom"
import { useEffect, useState } from 'react'
import {DataTable, PeroidButton} from './Graphs.js'

const UC2 = (props) => {

    const page = 'Statistics'
    const [data, setData] = useState()
    const [nodes, setNodes] = useState();
    //const [agr, setAgr] = useState([])
    const [mean, setMean] = useState([])
    const {init} = props;
    const location = useLocation()
    const [metric, setMetric] = useState("LMP")
    const [period, setPeriod] = useState("All")
    const [metrics, setMetrics] = useState(["LMP","MW"]);
    const [stateInit, setStateInit] = useState(init);

    useEffect(() => {
        setStateInit(init);
        pullNodes(location.state).then((obj) => setNodes(obj))
        aggregateNodes(location.state).then((obj => setData(obj)))
        //getMean()
    }, [location.state, init])

    useEffect(() => {
        let arr = [];
        for (let key in stateInit) {
            //console.log(key)
            let keystr = (key).toString().toLocaleLowerCase();
            if (stateInit[key] === 'number' && !keystr.includes("id")) {
                arr.push(key)
            }
        }
        setMetrics(arr);
    }, [stateInit, data])
    
    
    /* function getMean() {
        if(agr !== undefined){
            let arr = []
            Object.keys(agr).forEach((key) => {
                
                if(init[key] === 'number'){
                    let sum = 0
                    for(let i = 0; i < agr[key].length; ++i){
                        sum += parseFloat(agr[key][i])
                    }
                    let ret = sum/agr[key].length
                    arr = arr.concat({key: ret})
                }     
            })
            setMean(arr)
        }
    } */
    

    return (  
        <div className="UC2">
            <Navbar page={page}/>
            <div className="content">
            <div className='dateTime'>
                    <select className='metricSelector'
                            onChange={(e) => setMetric(e.target.value)}>
                        {metrics.map((metric) => (
                            <option key={metric.toString()} value={metric}>{metric}</option>
                        ))}
                    </select> 
                </div>

                {/* <div>{nodes[0]</div> */}
                <div className = 'statBox'>
                        <header className='StatsTitle'>Statistics ({metric})</header>
                        <br/>
                        <PeroidButton setParentPeriod={(per) => setPeriod(per)}/>
                        <br/>
                        <DataTable period={period} data={data} metric={metric}/>
                    </div>
                    <bre/>
                </div>

                <div className="values">{nodes?.map((node) => (JSON.stringify(node)))}</div>    
        </div>
    )
}

export default UC2