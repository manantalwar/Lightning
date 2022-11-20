import Home from './Home.js';
import Filter from './Filter.js';
import Validation from './Validate.js';
import UC2 from './UC2'
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { pullInit } from './getFromServer.mjs';
import { useEffect, useState } from 'react';


function App() {
  const [Val, setVal] = useState(); 
  useEffect(() => {
    let s = pullInit().then(res => {
      setVal(res);
    })
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/"element={<Home init={Val}/>}></Route>
          <Route path="/filter"element={<Filter/>}></Route>
          <Route path="/validate"element={<Validation/>}></Route>
          <Route path='/UC2'element={<UC2/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;