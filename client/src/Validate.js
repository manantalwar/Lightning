import Navbar from './Navbar';
import graph1 from './graph1.png'
import graph2 from './graph2.png'
import graph3 from './graph3.png'
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
                <div className ='images'>
                    {/* <Pie3D /> */}
                    {/* <div className='box'><img src={graph1} className="g1" alt="graph1" style={{width:"100%"}} /></div> */}
                    {/* <div className='box'><img src={graph2} className="g2" alt="graph2" style={{width:"100%"}} /></div>        */}
                    {/* <div className='box'><img src={graph3} className="g3" alt="graph3" style={{width:"100%"}} /> </div>  */}                    
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