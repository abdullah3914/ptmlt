import React from 'react';
import logo from './images/logo4.png';
import ReactDOM from 'react-dom';
import Welc from './Welcome';
import Background from './images/background.svg';
import Settings from './settings'
//import { AlgorithmProvider } from './AlgoContext';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import {useContext} from 'react';


/*ReactDOM.render(
  <AlgorithmProvider>
    <Router>
      <App />
    </Router>
 </AlgorithmProvider>,s
  document.getElementById('root')
);*/

function App() {
  return (
    <>
      <div className="App">
        <header>
          <nav>
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
          </nav>
        </header>
      </div>
      <body>
      <Router>
      <Routes>
      <Route path="/" element={<Welc/>} />
      <Route path="/settings" element={<Settings/>} />
      </Routes>
      </Router>
      </body>
    </>
  );
}

export default App;
