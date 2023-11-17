import './App.css';
import Header from './components/Header';
import FrontPage from './components/FrontPage';
import * as React from "react"
import StartPage from './components/StartPage';
import TestInterface from './components/TestInterface';
import ResultsPage from './components/ResultsPage';
import WhatsNextPage from './components/WhatsNextPage';
import PhobiaDefinitions from './components/PhobiaDefinitions';



function App() {

  return (
    <div className="App">
      <PhobiaDefinitions/>
    </div>
  );
}

export default App;
