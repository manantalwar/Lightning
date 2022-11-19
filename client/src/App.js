import Home from './Home.js';
import Filter from './Filter.js';
import Validation from './Validate.js';
import UC2 from './UC2'
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/filter"element={<Filter  init = {"hello"} />}></Route>
          <Route path="/validate"element={<Validation />}></Route>
          <Route path='/UC2'element={<UC2 init = {"hello"} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;