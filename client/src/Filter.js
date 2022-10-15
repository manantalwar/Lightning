import Navbar from './Navbar';
import { useState } from 'react';
import './Filter.css'

const Filter = () => {
    const page = "Filter"
    const [filters, setFilters] = useState([]);
    return (  
        <div className="filter">
            <Navbar page={page}/>
            <div className="containter">
                <div className="filterList">
                    
                </div>
                <button className="submit">Submit</button>
            </div> 
        </div>
    );
}
 
export default Filter;