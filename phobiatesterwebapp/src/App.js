import './App.css';
import Header from './components/Header';
import FrontPage from './components/FrontPage';
import * as React from "react"
import StartPage from './components/StartPage';
import ImageChanger from './components/ImageChanger';

function App() {

  return (
    <div className="App">
      <StartPage />
      <ImageChanger />
    </div>
  );
}

export default App;
