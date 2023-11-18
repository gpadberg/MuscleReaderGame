import './App.css';
import Header from './components/Header';
import FrontPage from './components/FrontPage';
import * as React from "react"
import StartPage from './components/StartPage';
import TestInterface from './components/TestInterface';
import ResultsPage from './components/ResultsPage';
import WhatsNextPage from './components/WhatsNextPage';
import PhobiaDefinitions from './components/PhobiaDefinitions';
import ImageChanger from './components/ImageChanger';

function App() {

  return (
    <div className="App">
      <ResultsPage/>
      <StartPage />
      <ImageChanger />
    </div>
  );
}

export default App;
