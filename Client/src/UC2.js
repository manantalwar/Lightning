import Navbar from "./Navbar"
import './UC2.css'
import {pullNodes} from './getFromServer.mjs'
import { useLocation } from "react-router-dom"
import { useEffect, useState } from 'react'

const UC2 = (props) => {

    const page = 'Statistics'
    const [nodes, setNodes] = useState([])
    const [agr, setAgr] = useState([])
    const {init} = props;
    const location = useLocation()

    
    useEffect(() => {
        
        pullNodes(location.state).then((obj) => setNodes(obj))
        
    }, [init, location.state])
    
    /* console.log(nodes) */
    /* console.log(location.state) */

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