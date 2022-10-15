import Navbar from './Navbar';
import { useState } from 'react';
import './Filter.css'

const Filter = () => {
    const page = "Filter"
    const [filters, setFilters] = useState([]);
    const scenarios = ['select scenario', 'a', 'b', 'c'];
    return (  
        <div className="filter">
            <Navbar page={page}/>
            <div className="content">
                <div className="list">
                    <p className="topTitle">Active Filters</p>
                    <div className="filterList">
                            
                    </div>
                    <button className="submit">Submit</button>
                </div>
                <div className='filters'>
                    <p className='topTitle'>Custom Filters</p>
                    <input className='filterInputs' type='text' value='key'></input>
                    <input className='filterInputs' type='text' value='value'></input>
                    <button className='add'>Add Filter</button>
                    <p className='scenarioTitle'>Scenarios</p>
                    <select className='filterInputs'>
                        {scenarios.map((scenario) => (
                            <option value={scenario}>{scenario}</option>
                        ))}
                    </select>
                </div>
                <div className='filters'>
                    <p className='topTitle'>Dates</p>
                    <input className='filterInputs' type='date'></input>
                    <input className='filterInputs' type='date'></input>
                    <input className='filterInputs' type='time'></input>
                    <input className='filterInputs' type='time'></input>
                    <button className='add'>Add Filter</button>
                </div>
                <div className='filters'>
                    <p className='topTitle'>LMP</p>
                    <input className='filterInputs' type='text' value='start'></input>
                    <input className='filterInputs' type='text' value='end'></input>
                    <button className='add'>Add Filter</button>
                </div>
            </div> 
        </div>
    );
}
 
export default Filter;