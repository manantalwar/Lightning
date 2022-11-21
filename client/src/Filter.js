import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import './Filter.css'
import {get} from './getFromServer.mjs'
import { Link } from 'react-router-dom'
//import {get} from './getFromServer.mjs'

const Filter = (props) => {

    const page = "Node Selector"
    const [filters, setFilters] = useState([])
    const [queries, setQueries] = useState([])
    const scenarios = ['1', '2', '3'];
    const [keys, setKeys] = useState({})
    const [startLMP, setStartLMP] = useState()
    const [endLMP, setEndLMP] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [scenario, setScenario] = useState()
    const [customKey, setCustomKey] = useState()
    const [customOne, setCustomOne] = useState()
    const [customStart, setCustomStart] = useState()
    const [customEnd, setCustomEnd] = useState()
    const [getList, setGetList] = useState([])
    const {init} = props;


    /*
    function intitialize(){
        pullInit().then((data) => {
            Object.keys(data).map((key) => {
                if(data[key] === 'object' || key === 'LMP' || key === 'PERIOD_ID' || key === 'SCENARIO_ID'){
                    delete data[key]  
                }
            });
            setKeys(data)
        });

    }
    */

    useEffect(() => {
        
        let temp = { ...init }
        Object.keys(temp).map((key) => {
            if(temp[key] === 'object' || key === 'LMP' || key === 'PERIOD_ID' || key === 'SCENARIO_ID'){
                delete temp[key]  
            }
            return null;
        });
        setKeys(temp)

    }, [init])

    const createQuery = () => {
        console.log(queries)
        let query = '?'
        queries.map((cur) => (
            query += '&'+cur
        ))
        return query
    }

    const addLMP = () => {
        if((startLMP !== '' || endLMP !== '') && (startLMP !== undefined || endLMP !== undefined) && (startLMP !== undefined || endLMP !== '') &&(startLMP !== '' || endLMP !== undefined)){
            let filter
            let query
            if(startLMP === '' || startLMP === undefined){
                filter = {key:'LMP', value:endLMP}
                query = 'LMP=' + endLMP
            } else if (endLMP === '' || endLMP === undefined){
                filter = {key:'LMP', value:startLMP}
                query = 'LMP=' + startLMP
            } else{
                filter = {key:'LMP', start:startLMP, end:endLMP}
                query = 'LMP=range&LMP=' + startLMP + '&LMP=' + endLMP
            }
            setFilters(filters.concat([filter]))
            setQueries(queries.concat([query]))
        }
    }
    
    const addDate = () => {
        if (startDate !== undefined) {
            //let query = '';
            /* no end date */

            /* console.log(startDate)
            console.log(endDate)
            console.log(startTime)
            console.log(endTime) */
            
            let filter = {key: 'date', startDate: startDate};
            let firstQuery= 'PERIOD_ID=' + startDate;
            let secondQuery= '&PERIOD_ID=';

            if(startTime !== undefined){
                firstQuery += 'T' + startTime + ':00.000Z';
                filter["startTime"] = startTime;
            }else{
                firstQuery += 'T00:00:00.000Z';
                filter["startTime"] = "00:00"
            }
            if(endDate !== undefined){
                secondQuery += endDate;
                filter["endDate"] = endDate;
                if(endTime !== undefined){
                    secondQuery += 'T' + endTime + ':00.000Z';
                    filter["endTime"] = endTime;
                } else {
                    secondQuery += 'T23:59:00.000Z';
                    filter["endTime"] = "23:59";
                }
            } else {
                secondQuery += startDate;
                filter["endDate"] = startDate;
                if(endTime !== undefined){
                    secondQuery += 'T' + endTime + ':00.000Z';
                } else {
                    secondQuery += 'T23:59:00.000Z';
                }
            }

            //console.log(filter)
            //console.log(firstQuery + secondQuery)

            setFilters(filters.concat([filter]))
            setQueries(queries.concat([firstQuery + secondQuery]))

            /*
            if (endDate === undefined) {
                //no start time
                if (startTime === undefined) {
                    filter = { key: 'date', start: startDate }
                } else {
                    filter = { key: 'date', start: startDate }
                    query = 'PERIOD_ID=' + startDate + 'T00:00:00.000Z&PERIOD_ID=' + startDate + 'T23:59:59.999Z'
                }
                //time but no end date 
            } else {
                if (endTime === undefined) {

                    
                    filter = { key: 'date', day: startDate, time: startTime }

                    query = 'PERIOD_ID=' + startDate + 'T' + startTime + ':00.000Z'
                } else { 
                    filter = { key: 'date', day: startDate, startTime: startTime, endTime: endTime }
                    query = 'PERIOD_ID=' + startDate + 'T' + startTime + ':00.000Z&PERIOD_ID=' + startDate + 'T' + endTime + ':00.000Z'
                }
            }
            */

            /* filter = {key:'date', start: startDate, end: endDate, startTime: startTime, endTime: endTime, period: period}
             query   */

        }
    }
    const addScenario = () => {
        if(scenario !== undefined){
            const filter = {key:'scenario', scenario: scenario}
            const query = 'SCENARIO_ID='+scenario
            setFilters(filters.concat([filter]))
            setQueries(queries.concat([query]))
        }
    }
    const addCustom = () => {
        if(keys[customKey] === 'string'){
            if(customOne !== undefined && customOne !== ''){
                const filter = {key:customKey, value: customOne}
                const query = customKey+'='+customOne
                setFilters(filters.concat([filter]))
                setQueries(queries.concat([query]))
            }
        } else{
            if(customStart !== undefined && customStart !== ''){
                let filter
                let query
                if(customEnd !== undefined && customEnd !== ''){
                    filter = {key:customKey, start: customStart, end: customEnd}
                    query = customKey+'=range&'+customKey+'='+customStart+'&'+customKey+'='+customEnd
                } else{
                    filter = {key:customKey, value: customStart}
                    query = customKey+'='+customStart
                }
                setFilters(filters.concat([filter]))
                setQueries(queries.concat([query]))
            } else if(customEnd !== undefined && customEnd !== ''){
                const filter = {key:customKey, value: customEnd}
                const query = customKey+'='+customEnd
                setFilters(filters.concat([filter]))
                setQueries(queries.concat([query]))
            }
        }
    }
    const remove = (index) => {
        setFilters(filters.filter((el, i) => i !== index))
        setQueries(queries.filter((el, i) => i !== index))
    }

    const setGetListKey = (key) => {
        get(key).then((nodes) => {
            setGetList(nodes)
        }).catch(() => "")
    }

    const reset = () => {
        setFilters([])
        setQueries([])
    }


    return (  
        <div className="body">
            <Navbar page={page}/>
            <div className="content">
                {/* Filter list box */}
        
                <div className='customfilter'>
                    <div className='customInput'> 
                        {/* Custom Filters */}
                        <p className='topTitle'>Unique Descriptors</p> 
                        <select className='filterInputs'
                            onChange={(e) => {setCustomKey(e.target.value); setGetListKey(e.target.value);}}
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

                        <button className='add' onClick={addCustom}>Add Filter</button>
                        {/* Scenario Filters */}
                    </div>
                        <div>
                    
                        </div>
                    <div className='getBlock'>
                    <p className='getTitle'>Values:</p>
                    <div className="getList">
                        {getList.map((elem) => (<pre><p className='getText'>{elem}</p></pre>))}
                    </div>
                    </div>
                </div>
                <div className="rightcontent">
                {/* Div containing custom filters and scenario */}
                <div className="topcontent">
                    <div className='filters'>
                        {/* Date filter div */}
                        <div className='filter'> 
                            <div className='filterTitleBorder'><p className='filterTitle'>Dates</p></div>
                            <input className='filterInputs' type='date'
                                onChange={(e) => setStartDate(e.target.value)}/>
                            <input className='filterInputs' type='date'
                                onChange={(e) => setEndDate(e.target.value)}/>
                            <input className='filterInputs' type='time'
                                onChange={(e) => setStartTime(e.target.value)}/>
                            <input className='filterInputs' type='time'
                                onChange={(e) => setEndTime(e.target.value)}/>
                            {/* <input className='filterInputs' type='number'
                                onChange={(e) => setPeriod(e.target.value)}/> */}
                            <button className='add'
                                onClick={addDate}>Add Filter</button>
                        </div>
                        {/* LMP filter div */}
                        <div className='filter'>
                            <div className='filterTitleBorder'><p className='filterTitle'>LMP</p></div>
                            <input className='filterInputs' type='number' 
                                defaultValue={'start'}
                                onChange={(e) => setStartLMP(e.target.value)}
                            />
                            <input className='filterInputs' type='number' 
                                defaultValue={'end'}
                                onChange={(e) => setEndLMP(e.target.value)}
                            />
                            <button className='add'onClick={addLMP}>Add Filter </button>

                        </div>
                        <div className='filter'>
                        <div className='filterTitleBorder'><p className='filterTitle'>Scenarios</p></div>
                                <select className='filterInputs'
                                    onChange={(e) => setScenario(e.target.value)}
                                    defaultValue={'scenario'}>
                                    {/* <option value='select' disabled selected hidden> select scenario </option> */}
                                    {scenarios.map((scenario) => (
                                        <option value={scenario}>{scenario}</option>
                                    ))}
                                </select>
                                <button className='add' onClick={addScenario}>Add Scenario</button>
                        </div>
                    </div>
                    <div className='action'>
                            {/* <button className="submit">Submit</button> */}                        
                            <Link
                                to = '/UC2'
                                state={createQuery()}
                            ><button className='submitBtn'>Submit</button></Link>
                            <button className='resetBtn' onClick={reset}>Reset</button>
                    </div>
                </div>

                <div className="list"> 
                    <p className="topTitle">Active Filters</p>
                    {/* <div> <span>key</span> <span>values</span></div> */}
                    <div className="filterList">
                        <div>
                        {filters.map((filter, index) => (
                            <div className='filterObj'>
                                {Object.keys(filter).map((key) => (
                                    <p className='filterEl'>{key + ': ' + filter[key]}</p>
                                ))}
                                <button className='remove' onClick={() => remove(index)}>Remove</button>
                            </div>
                            
                        ))}
                        </div>
                    </div>
                </div>
                </div>

                
            </div> 
        </div>
    );
}
 
export default Filter;