import React, {useState} from 'react'
import Navbar from './Navbar';
import './Validate.css'
import Modal from './Modal'
import expand from './expand.jpeg'

import { HeatMap, ScatterPlot, Histogram} from './Graphs';
import LineChart from './Graphs';

const Validation = () => {
    const page = "Validation"
    const scenarios = ['a', 'b', 'c'];
    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const [isOpen3, setIsOpen3] = useState(false)
    const [isOpen4, setIsOpen4] = useState(false)

    return (  
        <div className="validation">
            <Navbar page={page}/>
            <div className="contentVal">
                <div className='dateTime'>
                    <p className='titles'>Dates</p>
                    <input className='inputs' type='date'></input>
                    <input className='inputs' type='date'></input>
                    <p className='titles'>Times</p>
                    <input className='inputs' type='time'></input>
                    <input className='inputs' type='time'></input>
                    <select className='scenarioSelector'>
                        {scenarios.map((scenario) => (
                            <option value={scenario}>{scenario}</option>
                        ))}
                    </select>
                    <button className='addB'>Update Filter</button>            
                </div>
                
                <div className='graphs'>
                    <div className = 'graph'>
                        <div class="expanding"> 
                            <LineChart />
                            <button className= "expandpos" onClick={() => setIsOpen1(true)}><img className="expanding" src={expand} alt="expand"/></button>
                            <Modal open={isOpen1} onClose={() => setIsOpen1(false)}>
                                <div>
                                    <LineChart />
                                </div>
                            </Modal>
                        </div>

                    </div>
                    <div className = 'graph'>
                        <div class="expanding"> 
                        <ScatterPlot />
                        <button className= "expandpos" onClick={() => setIsOpen1(true)}><img className="expanding" src={expand} alt="expand"/></button>
                        <Modal open={isOpen2} onClose={() => setIsOpen2(false)}>
                            <div>
                                <ScatterPlot />
                            </div>
                        </Modal>  
                        </div>
                    </div>
                    <div className = 'graph'>
                    <div class="expanding"> 
                        <div style={{width: "100%", height: "100%"}}>
                            <Histogram mainText={'Historgram: Base Case'} subText={'Base Case HUB Node Prices'}/>         
                            <Histogram mainText={'Historgram: Scenario'} subText={'HUB Node Prices of Scenario that we are Validating'}/>  
                        </div>
                        <button className= "expandpos" onClick={() => setIsOpen1(true)}><img className="expanding" src={expand} alt="expand"/></button>
                            <Modal open={isOpen3} onClose={() => setIsOpen3(false)}>
                            <div>
                                <Histogram mainText={'Historgram: Base Case'} subText={'Base Case HUB Node Prices'}/>         
                                <Histogram mainText={'Historgram: Scenario'} subText={'HUB Node Prices of Scenario that we are Validating'}/> 
                            </div>
                            </Modal>      
                        </div>                                            
                    </div>
                    <div className = 'graph'>
                        <div class="expanding"> 
                        <HeatMap />
                        <button className= "expandpos" onClick={() => setIsOpen1(true)}><img className="expanding" src={expand} alt="expand"/></button>
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