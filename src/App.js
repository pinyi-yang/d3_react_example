import React from 'react';
import './App.css';
import BarChart from './BarChart';
import AreaChart from './AreaChart';

function App() {
  return (
    <div className="App">
      <header>
        <h1>D3 React Library</h1>
      </header>

      <BarChart />
      <AreaChart />
    </div>
  );
}

export default App;
