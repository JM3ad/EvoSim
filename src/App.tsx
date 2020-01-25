import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import dotenv from 'dotenv';
import GridDisplay from './components/gridDisplay';
import Simulator from './models/simulator';
import SimulatorContextProvider, { useSettings } from './context/simulatorSettingsContext';

dotenv.config();
const sideLength = 8;
const maxFood = 15;

const App: React.FC = () => {
  const {settings} = useSettings();
  const simulator  = useState(new Simulator(sideLength, maxFood, settings))[0];

  return (
    <div className="App">
      <SimulatorContextProvider>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <GridDisplay simulator={simulator} />
        </header>
      </SimulatorContextProvider>
    </div>
  );
}

export default App;
