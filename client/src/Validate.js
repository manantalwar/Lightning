import React, {useState} from 'react'
import Navbar from './Navbar';
import './Validate.css'
import Modal from './Modal'
import expand from './expand.jpeg'
import {pullNodes, aggregateNodes} from './getFromServer.mjs'
import { HeatMap, ScatterPlot, Histogram} from './Graphs';
import LineChart from './Graphs';

const Validation = () => {
    const page = "Validation"
    const scenarios = ['1', '2', '3'];
    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const [isOpen3, setIsOpen3] = useState(false)
    const [isOpen4, setIsOpen4] = useState(false)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [scenario, setScenario] = useState()
    const [nodes, setNodes] = useState({})

    const getNodes = () => {
        let query = '?SCENARIO_ID=1'
        if(scenario !== undefined){
            query+='&SCENARIO_ID='+scenario
        }
        if(startDate !== undefined){
            let queryDate
            /* no end date */
            if(endDate === undefined){
                /* no start time */
                if(startTime === undefined){
                    queryDate='PERIOD_ID='+startDate+'T00:00:00.000'+'&PERIOD_ID='+startDate+'T23:59:59.999'
                /* time but no end date */
                } else{
                    if(endTime === undefined){
                        queryDate='PERIOD_ID='+startDate+'T'+startTime+':00.000'
                    } else {
                        queryDate='PERIOD_ID='+startDate+'T'+startTime+':00.000'+'&PERIOD_ID='+startDate+'T'+endTime+':00.000'
                    }
                }
            }
            query+='&'+queryDate
        }
        /* console.log(query) */
        aggregateNodes(query).then((obj) => {
            setNodes(obj);
            //console.log(nodes)
        })
        
    }

    return (  
        <div className="validation">
            <Navbar page={page}/>
            <div className="contentVal">
                <div className='dateTime'>
                    <p className='titles'>Dates</p>
                    <input className='inputs' type='date'
                            onChange={(e) => setStartDate(e.target.value)}></input>
                    <input className='inputs' type='date'
                            onChange={(e) => setEndDate(e.target.value)}></input>
                    <p className='titles'>Times</p>
                    <input className='inputs' type='time'
                            onChange={(e) => setStartTime(e.target.value)}></input>
                    <input className='inputs' type='time'
                            onChange={(e) => setEndTime(e.target.value)}></input>
                    <select className='scenarioSelector'
                            onChange={(e) => setScenario(e.target.value)}>
                        {scenarios.map((scenario) => (
                            <option value={scenario}>{scenario}</option>
                        ))}
                    </select>
                    <button className='addB'
                            onClick={getNodes}>
                            Update Filter</button>            
                </div>
                
                <div className='graphs'>
                    <div className = 'graph'>
                        <div className="expanding"> 
                            <LineChart data={nodes}/>
                            <button className= "expandpos" onClick={() => setIsOpen1(true)}><img className="expanding" src={expand} alt="expand"/></button>
                            <Modal open={isOpen1} onClose={() => setIsOpen1(false)}>
                                <div>
                                    <LineChart data={nodes}/>
                                </div>
                            </Modal>
                        </div>

                    </div>
                    <div className = 'graph'>
                        <div className="expanding"> 
                        <ScatterPlot />
                        <button className= "expandpos" onClick={() => setIsOpen2(true)}><img className="expanding" src={expand} alt="expand"/></button>
                        <Modal open={isOpen2} onClose={() => setIsOpen2(false)}>
                            <div>
                                <ScatterPlot />
                            </div>
                        </Modal>  
                        </div>
                    </div>
                    <div className = 'graph'>
                    <div className="expanding"> 
                        <div style={{width: "100%", height: "100%"}}>
                            <Histogram mainText={'Historgram: Base Case'} subText={'Base Case HUB Node Prices'}/>         
                            <Histogram mainText={'Historgram: Scenario'} subText={'HUB Node Prices of Scenario that we are Validating'}/>  
                        </div>
                        <button className= "expandpos" onClick={() => setIsOpen3(true)}><img className="expanding" src={expand} alt="expand"/></button>
                            <Modal open={isOpen3} onClose={() => setIsOpen3(false)}>
                            <div>
                                <Histogram mainText={'Historgram: Base Case'} subText={'Base Case HUB Node Prices'}/>         
                                <Histogram mainText={'Historgram: Scenario'} subText={'HUB Node Prices of Scenario that we are Validating'}/> 
                            </div>
                            </Modal>      
                        </div>                                            
                    </div>
                    <div className = 'graph'>
                        <div className="expanding"> 
                        <HeatMap />
                        <button className= "expandpos" onClick={() => setIsOpen4(true)}><img className="expanding" src={expand} alt="expand"/></button>
                        <Modal open={isOpen4} onClose={() => setIsOpen4(false)}>
                            <div>
                                <HeatMap />
                            </div>
                        </Modal>    
                        </div>                    
                    </div>
                    
                </div>

                {/* <div className ="data">
                    <p className="metrics">Useful Information:<br /> Maximum Difference: <br /> Minimum Difference: <br /> Average Difference:  </p>
                </div>   */}

            </div>
        </div>

    );
}
 
export default Validation;