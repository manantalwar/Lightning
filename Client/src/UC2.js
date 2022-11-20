import Navbar from "./Navbar"
import './UC2.css'
import {aggregateNodes, pullNodes} from './getFromServer.mjs'
import { useLocation } from "react-router-dom"
import { useEffect, useState } from 'react'

const UC2 = (props) => {

    const page = 'Statistics'
    const [nodes, setNodes] = useState([])
    const [agr, setAgr] = useState([])
    const [mean, setMean] = useState([])
    const {init} = props;
    const location = useLocation()

    
    useEffect(() => {
        
        pullNodes(location.state).then((obj) => setNodes(obj))
        aggregateNodes(location.state).then((obj => setAgr(obj)))
        getMean()
    }, [init, location.state])

    function getMean() {
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
    }
    

    return (  
        <div className="UC2">
            <Navbar page={page}/>
            <div className="content">
                {/* <div>{nodes[0]</div> */}
                <div className="values">{nodes.map((node) => (JSON.stringify(node)))}</div>
            </div>
        </div>
    )
}

export default UC2