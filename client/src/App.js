import Home from './Home.js';
import Filter from './Filter.js';
import Validation from './Validate.js';
import UC2 from './UC2'
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useEffect, useState} from 'react'
import { pullInit } from './getFromServer.mjs';

function App() {
  const [init, setInit] = useState()

  useEffect(()  =>  {
    pullInit().then(data => setInit(data))
  },[]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/filter" element={<Filter init={init} />}></Route>
          <Route path="/validate"element={<Validation init={init}/>}></Route>
          <Route path='/UC2'element={<UC2 init={init} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;