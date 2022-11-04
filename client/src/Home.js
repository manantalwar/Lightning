import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import './Home.css';
import axios from 'axios';

// const path = require('path');

const Home = ({props}) => {
    const [hover1, setHover1] = useState(false);
    const [hover2, setHover2] = useState(false);
    const page = "Home"

    // this function is fired when validation button is clicked.
    const clickValidation = async (event) => {
    event.preventDefault();
      await axios.post(`http://localhost:3000/filter`, {
        // sendFile: path.join(__dirname, "public", "Home.js")
        sendFile: ".\lightning\client\src\Validate.js"
      });
    };

    return (  
        <div className="home">
            <Navbar page={page}/>
            <div className="container">
                <div className="box">
                    <button 
                        className="mainbtn" 
                        onMouseEnter={() => setHover1(true)}
                        onMouseLeave={() => setHover1(false)}
                        onClick={() => clickValidation}>
                        {!hover1 && <div>Validation</div>}
                        {hover1 && <div>Validating simulation data as compared to base case data. Displays graphs comparing the data sets and shows useful statitsics comparing the data.</div>}
                    </button>
                    <button 
                        className="mainbtn"
                        onMouseEnter={() => setHover2(true)}
                        onMouseLeave={() => setHover2(false)}>
                        {!hover2 && <div>Simulation</div>}
                        {hover2 && <div>Filters datasets based on chosen queries and displays graphs and useful information about remaining nodes.</div>}
                        
                    </button>
                </div>
            </div>

        </div>
    );
}
 
export default Home;