import './App.css';
import Header from './components/Header';
import * as React from "react"
import { useState } from 'react';
import StartPage from './components/StartPage';
import TestInterface from './components/TestInterface';
import ResultsPage from './components/ResultsPage';
import WhatsNextPage from './components/WhatsNextPage';
import PhobiaDefinitions from './components/PhobiaDefinitions';
import ImageChanger from './components/ImageChanger';

function App() {

  const [landing, setLanding] = useState(true)

  return (
    <div className="App">
      <div class="bg-black text-white min-h-screen">
        <div class="flex justify-between w-full px-96 pt-8">
          <a href="#" onClick={()=> setLanding(false)} class="text-white mb-2">Phobia Definitions</a>
          <a href="#" class="text-white mb-2">About Us</a>
          <a href="#" class="text-white mb-2">What's Next?</a>
        </div>
      {landing && 
        <div class="text-center mt-28">
          <div class="flex justify-center items-center space-x-5 mb-8">
            <img alt="Logo" src="/phobiatestlogo.png" class="w-[30rem] h-[20rem] mb-6"></img>
          </div>
          <h1 class="text-5xl font-bold mb-14">PhobiaTester</h1>
          <p class="text-xl mr-6 ml-6 mb-14">PhobiaTester gives you a conclusive reading of your reactivity to common phobias. Learn more about yourself through our interactive analysis.</p>
          <button class="bg-blue-500 text-white font-bold py-2 px-6 rounded">
            Test me now!
          </button>
        </div>
      }
    </div>
    </div>
  );
}

export default App;
