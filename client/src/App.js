import Home from './Home.js';
import Filter from './Filter.js';
import Validation from './Validate.js';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/"element={<Home/>}></Route>
          <Route path="/filter"element={<Filter/>}></Route>
          <Route path="/validate"element={<Validation/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;