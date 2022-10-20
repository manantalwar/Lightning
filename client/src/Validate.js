import Navbar from './Navbar';
import './Validate.css'

import { HeatMap, ScatterPlot, Histogram, LineChart } from './Graphs';

const Validation = () => {
    const page = "Validation"
    return (  
        <div className="validation">
            <Navbar page={page}/>
            <div className="container">
                <div className='filters'>
                    <p className='title1'>Dates</p>
                    <input className='input1' type='date'></input>
                    <input className='input2' type='date'></input>
                    <p className='title2'>Times</p>
                    <input className='input3' type='time'></input>
                    <input className='input4' type='time'></input>
                    <button className='addB'>Add Filter</button>            
                </div>
                <div className ="data">
                    <p className="metrics">Useful Information:<br /> Maximum Difference: <br /> Minimum Difference: <br /> Average Difference:  </p>
                </div>          
                
            </div>
            <HeatMap />
            <br></br>
            <ScatterPlot />
            <br></br>
            <Histogram mainText={'Historgram: Base Case'} subText={'Base Case HUB Node Prices'}/>
            <br></br>
            <Histogram mainText={'Historgram: Scenario'} subText={'HUB Node Prices of Scenario that we are Validating'}/>
            <br></br>
            <LineChart />
        </div>

    );
}
 
export default Validation;