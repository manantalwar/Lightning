import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import './Filter.css'
import {pullInit} from './getFromServer.mjs'

const Filter = () => {
    const page = "Node Selector"
    const [filters, setFilters] = useState([])
    const [queries, setQueries] = useState([])
    const scenarios = ['a', 'b', 'c'];
    const [keys, setKeys] = useState({})
    const [startLMP, setStartLMP] = useState()
    const [endLMP, setEndLMP] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [period, setPeriod] = useState()
    const [scenario, setScenario] = useState()
    const [customKey, setCustomKey] = useState()
    const [customOne, setCustomOne] = useState()
    const [customStart, setCustomStart] = useState()
    const [customEnd, setCustomEnd] = useState()

    const addLMP = () => {
        /* if(startLMP !== undefined && endLMP !== undefined){} */
        const filter = {key:'LMP', start:startLMP, end:endLMP}
            /* if(end !== undefined){
                const query = filter.key + '=' + filter.start + '&' + filter.end
            } */
        setFilters(filters.concat(filter))
        /* } */
    }
    const addDate = () => {
        const filter = {key:'date', startDate: startDate, endDate: endDate, startTime: startTime, endTime: endTime, period: period}
        setFilters(filters.concat(filter))
    }
    const addScenario = () => {
        const filter = {key:'scenario', scenario: scenario}
        setFilters(filters.concat(filter))
    }
    const addCustom = () => {
        let filter
        if(keys[customKey] === 'string'){
            filter = {key:customKey, value: customOne}
        } else{ 
            filter = {key:customKey, start:customStart, end:customEnd}
        }
        setFilters(filters.concat(filter))
    }
    const remove = (index) => {
        setFilters(filters.filter((el, i) => i !== index))
        setQueries(queries.filter((el, i) => i !== index))
    }

    useEffect(() => {
        pullInit().then((obj) => setKeys(obj))
    }, [])


    

    return (  
        <div className="filter">
            <Navbar page={page}/>
            <div className="content">
                {/* Filter list box */}
                <div className="list"> 
                    <p className="topTitle">Active Filters</p>
                    <div className="filterList">
                        {filters.map((filter, index) => (
                            <div className='filterObj'>
                                {Object.keys(filter).map((key) => (
                                    <p className='filterEl'>{key + ': ' + filter[key]}</p>
                                ))}
                                <button className='remove'
                                    onClick={() => remove(index)}>-</button>
                            </div>
                            
                        ))}
                    </div>
                    <button className="submit">Submit</button>
                </div>
                {/* Div containing custom filters and scenario */}
                <div className='filters'> 
                    {/* Custom Filters */}
                    <p className='topTitle'>Unique Descriptors</p> 
                    <select className='filterInputs'
                        onChange={(e) => setCustomKey(e.target.value)}
                        defaultValue='key'>
                        {Object.keys(keys).map((key) => (
                            <option value={key}>{key}</option>
                        ))}
                    </select>
                    <div className='customFilters'>
                        {keys[customKey] === 'string' &&
                            <input className='customFilterInputs' type='text' defaultValue='value'
                                onChange={(e) => setCustomOne(e.target.value)}></input>
                        }
                        {keys[customKey] === 'number' &&
                            <div>
                                <input className='customFilterInputs' type='value' defaultValue='start'
                                    onChange={(e) => setCustomStart(e.target.value)}></input>
                                <input className='customFilterInputs' type='value' defaultValue='end'
                                    onChange={(e) => setCustomEnd(e.target.value)}></input> 
                            </div>
                        }
                    </div>
                    
                    <button className='add'
                        onClick={addCustom}>Add Filter</button>
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