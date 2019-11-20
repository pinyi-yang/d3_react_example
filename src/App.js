import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Selection from './Selection';

function App() {
  return (
    <div className="App">
      <header>
        <h1>D3 React Library</h1>
      </header>

      <Router>
        <Link to='/selection'>D3 Selection</Link> | {" "}
        <Link to='/barchart'>BarChart</Link> | {" "}
        <Link to='/areachart'>AreaChart</Link>
        <Route path='/selection' component={Selection} />
        <Route path='/barchart' render = { () => ( <BarChart /> )} />
        <Route path='/areachart' render = { () => ( <AreaChart />)} />
      </Router>

    </div>
  );
}

export default App;
