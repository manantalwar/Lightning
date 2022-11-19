import React, { useState } from "react";
import Navbar from './Navbar';
import './Home.css';
import './App.css';
// const path = require('path');

const Home = () => {

    const [hover1, setHover1] = useState(false);
    const [hover2, setHover2] = useState(false);
    const page = "Home"

    const openInNewTab=url=>{
        window.open(url, '_self', 'noopener,noreferrer');
    }

    return (  
        <div className="home">
            <Navbar page={page}/>
            <div className="container">
                <div className="box">
                    <button 
                        className="mainbtn" 
                        onMouseEnter={() => setHover1(true)}
                        onMouseLeave={() => setHover1(false)}
                        onClick={() => openInNewTab('./validate')}>
                        {!hover1 && <div>Validation</div>}
                        {hover1 && <div>Validating simulation data as compared to base case data. Displays graphs comparing the data sets and shows useful statitsics comparing the data.</div>}
                    </button>
                    <button 
                        className="mainbtn"
                        onMouseEnter={() => setHover2(true)}
                        onMouseLeave={() => setHover2(false)}
                        onClick={() => openInNewTab('./filter')}>
                        {!hover2 && <div>Simulation</div>}
                        {hover2 && <div>Filters datasets based on chosen queries and displays graphs and useful information about remaining nodes.</div>}
                        
                    </button>
                    {/* <Router>
                        <Routes>
                            <Route path="/"element={<Home/>}></Route>
                            <Route path="/filter"element={<Filter/>}></Route>
                            <Route path="/validate"element={<Validation/>}></Route>
                        </Routes>
                    </Router> */}
                </div>
            </div>

        </div>
    );
}
 
export default Home;