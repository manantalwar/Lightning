import Navbar from "./Navbar"
import './UC2.css'
import {pullNodes} from './getFromServer.mjs'
import { useLocation } from "react-router-dom"
import { useEffect, useState } from 'react'

const UC2 = () => {
    const page = 'Statistics'
    const location = useLocation()
    /* const { state } = this.props.location */
    const [nodes, setNodes] = useState([])
    const [agr, setAgr] = useState([])
    /* console.log(location.state) */
    useEffect(() => {
        pullNodes(location.state).then((obj) => setNodes(obj))
        
    }, [])
    /* console.log(nodes) */

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