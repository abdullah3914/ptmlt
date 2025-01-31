import React from 'react';
import logo from './images/logo5.png';
// import ReactDOM from 'react-dom';
import Welc from './Welcome';
import Initial from './initial';
// import Background from './images/background.svg';
import Settings from './settings'
import Final from './final'
//import { AlgorithmProvider } from './AlgoContext';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
// import {useContext} from 'react';


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
     <Router>
      <div className="App">
        <header>
          <nav>
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Welc />} />
          <Route path="/welc" element={<Welc />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/initial" element={<Initial />} />
          <Route path="/final" element={<Final />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
