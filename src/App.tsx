import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import dotenv from 'dotenv';
import GridDisplay from './components/gridDisplay';
import Simulator from './models/simulator';

dotenv.config();
const sideLength = 32;
const maxFood = 20;

const App: React.FC = () => {
  const simulator  = useState(new Simulator(sideLength, maxFood))[0];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GridDisplay simulator={simulator} />
      </header>
    </div>
  );
}

export default App;
