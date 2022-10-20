import Navbar from './Navbar';
import './Validate.css'

import { HeatMap, ScatterPlot, Histogram, LineChart } from './Graphs';

const Validation = () => {
    const page = "Validation"
    const scenarios = ['a', 'b', 'c'];
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
                
                <div className='twoGraphs'>
                    <div className = 'graph'>
                        <LineChart />
                    </div>
                    
                    {/* <br></br> */}
                    <div className = 'graph'>
                        <ScatterPlot />
                    </div>
                </div>
                {/* <br></br> */}
                <div className='twoGraphs'>                
                    <div className = 'graph'>
                        <div className = 'histogram'>
                            <Histogram mainText={'Historgram: Base Case'} subText={'Base Case HUB Node Prices'}/>         
                        </div>
                        {/* <br></br> */}
                        <div className = 'histogram'>
                            <Histogram mainText={'Historgram: Scenario'} subText={'HUB Node Prices of Scenario that we are Validating'}/>                        
                        </div>
                    </div>
                    <br></br>
                    <div className = 'graph'>
                        <HeatMap />
                    </div>
                </div>

                <div className ="data">
                    <p className="metrics">Useful Information:<br /> Maximum Difference: <br /> Minimum Difference: <br /> Average Difference:  </p>
                </div>  

            </div>
        </div>

    );
}
 
export default Validation;