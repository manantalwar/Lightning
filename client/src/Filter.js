import Navbar from './Navbar';
import { useState } from 'react';
import './Filter.css'

const Filter = () => {
    const page = "Filter"
    const [filters, setFilters] = useState([]);
    const scenarios = ['a', 'b', 'c'];
    const keys = {selectKey: '', a:'string',b:'float'}
    const [startLMP, setStartLMP] = useState()
    const [endLMP, setEndLMP] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [period, setPeriod] = useState()
    const [scenario, setScenario] = useState()
    const [customKey, setCustomKey] = useState()

    const addLMP = () => {
        const filter = {key:'LMP', start:startLMP, end:endLMP};
        setFilters(filters.concat(filter));
    }
    const addDate = () => {
        const filter = {key:'date', startDate: startDate, endDate: endDate, startTime: startTime, endTime: endTime, period: period}
        setFilters(filters.concat(filter))
    }
    const addScenario = () => {
        const filter = {key:'scenario', scenario: scenario}
        setFilters(filters.concat(filter))
    }
    
    return (  
        <div className="filter">
            <Navbar page={page}/>
            <div className="content">
                {/* Filter list box */}
                <div className="list"> 
                    <p className="topTitle">Active Filters</p>
                    <div className="filterList">
                        <p>{JSON.stringify(filters)}</p>
                    </div>
                    <button className="submit">Submit</button>
                </div>
                {/* Div containing custom filters and scenario */}
                <div className='filters'> 
                    {/* Custom Filters */}
                    <p className='topTitle'>Custom Filters</p> 
                    {/* <input className='filterInputs' type='text' defaultValue='key'></input> */}
                    <select className='filterInputs'
                        onChange={(e) => setCustomKey(e.target.value)}
                        defaultValue='key'>
                        {Object.keys(keys).map((key) => (
                            <option value={key}>{key}</option>
                        ))}
                    </select>
                    <div>
                        {keys[customKey] === 'string' &&
                            <input className='filterInputs' type='text' defaultValue='value'></input>
                        }
                        {keys[customKey] === 'float' &&
                            <div>
                                <input className='filterInputs' type='value' defaultValue='start'></input>
                                <input className='filterInputs' type='value' defaultValue='end'></input> 
                            </div>
                        }
                    </div>
                    
                    <button className='add'>Add Filter</button>
                    {/* Scenario Filters */}
                    <p className='scenarioTitle'>Scenarios</p>
                    <select className='filterInputs'
                        onChange={(e) => setScenario(e.target.value)}
                        defaultValue={'scenario'}>
                        {/* <option value='select' disabled selected hidden> select scenario </option> */}
                        {scenarios.map((scenario) => (
                            <option value={scenario}>{scenario}</option>
                        ))}
                    </select>
                    <button className='add'
                        onClick={addScenario}>Add Scenario</button>
                </div>
                {/* Date filter div */}
                <div className='filters'> 
                    <p className='topTitle'>Dates</p>
                    <input className='filterInputs' type='date'
                        onChange={(e) => setStartDate(e.target.value)}/>
                    <input className='filterInputs' type='date'
                        onChange={(e) => setEndDate(e.target.value)}/>
                    <input className='filterInputs' type='time'
                        onChange={(e) => setStartTime(e.target.value)}/>
                    <input className='filterInputs' type='time'
                        onChange={(e) => setEndTime(e.target.value)}/>
                    <input className='filterInputs' type='number'
                        onChange={(e) => setPeriod(e.target.value)}/>
                    <button className='add'
                        onClick={addDate}>Add Filter</button>
                </div>
                {/* LMP filter div */}
                <div className='filters'>
                    <p className='topTitle'>LMP</p>
                    <input className='filterInputs' type='number' 
                        defaultValue={'start'}
                        onChange={(e) => setStartLMP(e.target.value)}
                    />
                    <input className='filterInputs' type='number' 
                        defaultValue={'end'}
                        onChange={(e) => setEndLMP(e.target.value)}
                    />
                    <button className='add' 
                        onClick={addLMP}>Add Filter </button>
                </div>
            </div> 
        </div>
    );
}
 
export default Filter;