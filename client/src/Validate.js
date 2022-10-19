import Navbar from './Navbar';
import './Validate.css'

import { HeatMap, PieChart, Pie3D, Donut3D, LineChart, BarChart } from './Templates';

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
            <LineChart />
            <br></br>
            <BarChart />
            <br></br>
            <Donut3D />
            <br></br>
            <HeatMap />
        </div>

    );
}
 
export default Validation;