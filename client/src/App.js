import Home from './Home.js';
import Filter from './Filter.js';
import Validation from './Validate.js';
import UC2 from './UC2'
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
<<<<<<< HEAD
import { pullInit } from './getFromServer.mjs';
import { useEffect, useState } from 'react';


function App() {
  const [Val, setVal] = useState(); 
  useEffect(() => {
    let s = pullInit().then(res => {
      setVal(res);
    })
  }, []);
=======
import { useEffect, useState} from 'react'
import { pullInit } from './getFromServer.mjs';

function App() {
  const [init, setInit] = useState()

  useEffect(()  =>  {
    pullInit().then(data => setInit(data))
  },[]);

>>>>>>> fab7c44bd82bf583c3d23875a24e1f3444e211c8
  return (
    <Router>
      <div className="App">
        <Routes>
<<<<<<< HEAD
          <Route path="/"element={<Home init={Val}/>}></Route>
          <Route path="/filter"element={<Filter/>}></Route>
          <Route path="/validate"element={<Validation/>}></Route>
          <Route path='/UC2'element={<UC2/>}></Route>
=======
          <Route path="/" element={<Home />}></Route>
          <Route path="/filter" element={<Filter init={init} />}></Route>
          <Route path="/validate"element={<Validation />}></Route>
          <Route path='/UC2'element={<UC2 init={init} />}></Route>
>>>>>>> fab7c44bd82bf583c3d23875a24e1f3444e211c8
        </Routes>
      </div>
    </Router>
  );
}

export default App;