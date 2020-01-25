import React from 'react';
import logo from './logo.svg';
import './App.css';
import dotenv from 'dotenv';

dotenv.config();

const App: React.FC = () => {
  const callThing = () => {
    console.log("Making request e");
    console.log(process.env);
    fetch(process.env.REACT_APP_SERVER_ADDRESS + "/demo/person", {mode: 'no-cors'}).then((response) => {
      console.log(response);
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={callThing}>Do the thing</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
