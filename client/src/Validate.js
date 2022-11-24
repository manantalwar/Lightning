import React, {useState, useEffect} from 'react'
import Navbar from './Navbar';
import './Validate.css'
import Modal from './Modal'
import expand from './expand.jpeg'
import {aggregateNodes, get} from './getFromServer.mjs'
import { HeatMap, ScatterPlot, Histogram, PeroidButton, DataTable} from './Graphs';
import LineChart from './Graphs';

const Validation = (props) => {
    const page = "Validation"
    const [allNodeNames, setAllNodeNames] = useState(["All"])
    const [nodeName, setNodeName] = useState("All")
    const [period, setPeriod] = useState("All")
    const [histoBucket, setHistoBucket] = useState(1);
    const [metric, setMetric] = useState("LMP");
    const [metrics, setMetrics] = useState(["LMP","MW"]);
    const {init} = props;
    const [stateInit, setStateInit] = useState(init);
    const [scenarios, setScenarios] = useState([])
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
    const [includeBase, setIncludeBase] = useState(true);


    useEffect(() => {
        getNodes();
        get('PNODE_NAME').then((names) => {
            setAllNodeNames(allNodeNames.concat(names))
        }).catch(() => "")
        get('SCENARIO_ID').then((scen) => (
            setScenarios(scen)
        )).catch(() => '')
    }, [])

    useEffect(()=>{
        if(init !== undefined){
        setStateInit(init);
        }
    },[init]);  


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
    }, [stateInit])

    useEffect(()=>{
        if(metric==="LMP"){
            setHistoBucket(1);
        }
        if(metric==="MW"){
            setHistoBucket(100);
        }
    },[metric])


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
                    queryDate='PERIOD_ID='+startDate+'T00:00:00.000&PERIOD_ID='+startDate+'T23:59:59.999';
                /* time but no end date */
                } else{
                    if(endTime === undefined){
                        queryDate='PERIOD_ID='+startDate+'T'+startTime+':00.000';
                    } else {
                        queryDate='PERIOD_ID='+startDate+'T'+startTime+':00.000&PERIOD_ID='+startDate+'T'+endTime+':00.000';
                    }
                }
            }
            query+='&'+queryDate
        }
        if(nodeName !== undefined && nodeName !== "All"){
            query+='&PNODE_NAME='+nodeName
        }

        aggregateNodes(query).then((obj) => {
            setNodes(obj);
        })
    }   

    //console.log(nodes)

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
                            <option key={scenario.toString()} value={scenario}>{scenario}</option>
                        ))}
                    </select>
                    <select className='metricSelector'
                            onChange={(e) => setMetric(e.target.value)}>
                        {metrics.map((metric) => (
                            <option key={metric.toString()} value={metric}>{metric}</option>
                        ))}
                    </select>
                    <select className='nodeSelector'
                            onChange={(e)=> setNodeName(e.target.value)}>
                        {allNodeNames.map((name) => (
                            <option value={name}>{name}</option>
                        ))}
                    </select>
                    <button className='addB'
                            onClick={getNodes}>
                            Update Filter</button>            
                </div>
                
                <div>

                <div className='graphs'>
                    <div className = 'graph'>
                        <div className="expanding"> 
                            <LineChart height={95} data={nodes}/>
                            <button className= "expandpos" onClick={() => setIsOpen1(true)}><img className="expanding" src={expand} alt="expand"/></button>
                            <Modal open={isOpen1} onClose={() => setIsOpen1(false)}>
                                <div>
                                    <LineChart height={50} data={nodes}/>
                                </div>
                            </Modal>
                        </div>

                    </div>
                    <div className = 'graph'>
                        <div className="expanding"> 
                        <ScatterPlot height={95} data={nodes}/>
                        <button className= "expandpos" onClick={() => setIsOpen2(true)}><img className="expanding" src={expand} alt="expand"/></button>
                        <Modal open={isOpen2} onClose={() => setIsOpen2(false)}>
                            <div>
                                <ScatterPlot height={50} data={nodes}/>
                            </div>
                        </Modal> 
                        </div>
                    </div>
                    <div className = 'graph'>
                    <div className="expanding"> 
                        <div style={{width: "100%", height: "100%", verticalText:"center",}}>
                                    <div className="histoPeriod">
                                        <label for="histo">Histogram Bucket Size</label><bre/>
                                        <input type="text" id="histo" onChange={(e) => {
                                            let val = parseFloat(e.target.value);
                                            if(!isNaN(val) && val !== 0){
                                                setHistoBucket(Math.abs(val));
                                            }}}></input>
                                    </div>
                                    <bre/><bre/>
                            <Histogram mainText={'Histogram: Base Case'} subText={'Base Case Metrics'} data={{...nodes, ...{base:true}}} bucket={histoBucket} metric={metric}/>         
                            <Histogram mainText={'Histogram: Scenario'} subText={'Scenario Metrics'} data={{...nodes, ...{base:false}}} bucket={histoBucket} metric={metric}/>  
                        </div>
                        <button className= "expandpos" onClick={() => setIsOpen3(true)}><img className="expanding" src={expand} alt="expand"/></button>
                            <Modal open={isOpen3} onClose={() => setIsOpen3(false)}>
                            <div>
                                    <div className="histoPeriod">
                                        <label for="histo">Histogram Bucket Size: </label>
                                        <input type="text" id="histo" onChange={(e) => {
                                            let val = parseFloat(e.target.value);
                                            if(!isNaN(val) && val !== 0){
                                                setHistoBucket(Math.abs(val));
                                            }}}></input>
                                    </div>
                                <Histogram mainText={'Histogram: Base Case'} subText={'Base Case Metrics'} data={{...nodes, ...{base:true}}} bucket={histoBucket} metric={metric}/>         
                                <Histogram mainText={'Histogram: Scenario'} subText={'Scenario Metrics'} data={{...nodes, ...{base:false}}} bucket={histoBucket} metric={metric}/> 
                            </div>
                            </Modal>      
                        </div>                                            
                    </div>
                    <div className = 'graph'>
                            <div className="expanding">
                            <div className='checkcontainer'>
                                <label><p className="checkText">Include Base Case: </p></label>
                                <input className="check" type="checkbox"
                                    onChange={(event) => setIncludeBase(event.currentTarget.checked)}
                                    checked={includeBase}
                                />
                            </div>
                        <HeatMap data={nodes} metric={metric} inc={includeBase} name={nodeName}/>
                        <button className= "expandpos" onClick={() => setIsOpen4(true)}><img className="expanding" src={expand} alt="expand"/></button>
                        <Modal open={isOpen4} onClose={() => setIsOpen4(false)}>
                            <div> 
                                <div className='checkcontainer'>
                                <label className="checkText"> Include Base Case: </label>
                                    <input className="check" type="checkbox"
                                        onChange={(event) => setIncludeBase(event.currentTarget.checked)}
                                        checked={includeBase}
                                    />
                                </div>
                                <HeatMap data={nodes} metric={metric} inc={includeBase} name={nodeName}/>
                            </div>
                        </Modal>    
                        </div>                    
                    </div>

                    <div className = 'statBox'>
                        <header className='StatsTitle'>Statistics ({metric})</header>
                        <br/>
                        <PeroidButton setParentPeriod={(per) => setPeriod(per)}/>
                        <br/>
                        <DataTable period={period} data={nodes} metric={metric}/>
                    </div>

                </div>

                </div>

            </div>
        </div>

    );
}
 
export default Validation;