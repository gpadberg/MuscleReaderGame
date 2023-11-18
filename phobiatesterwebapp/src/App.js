import "./App.css";
import Header from "./components/Header";
import * as React from "react";
import { useState } from "react";
import StartPage from "./components/StartPage";
import TestInterface from "./components/TestInterface";
import ResultsPage from "./components/ResultsPage";
import WhatsNextPage from "./components/WhatsNextPage";
import PhobiaDefinitions from "./components/PhobiaDefinitions";
import AboutUs from "./components/AboutUs";
import ImageChanger from "./components/ImageChanger";

function App() {
  const [landing, setLanding] = useState(true);
  const [defs, setDefs] = useState(false);
  const [about, setAbout] = useState(false);
  const [next, setNext] = useState(false);
  const [start, setStart] = useState(false);

  return (
    <div className="App">
      <div class="bg-black text-white min-h-screen">
        {start ? (
          <ImageChanger />
        ) : (
          <>
            <div class="flex justify-between w-full px-96 pt-8">
              <a
                href="#"
                onClick={() => {
                  setLanding(true);
                  setDefs(false);
                  setAbout(false);
                  setNext(false);
                }}
                class="transition text-white hover:text-blue-500 mb-2"
              >
                Home
              </a>
              <a
                href="#"
                onClick={() => {
                  setLanding(false);
                  setDefs(true);
                  setAbout(false);
                  setNext(false);
                }}
                class="transition text-white hover:text-blue-500 mb-2"
              >
                Phobia Definitions
              </a>
              <a
                href="#"
                onClick={() => {
                  setLanding(false);
                  setDefs(false);
                  setAbout(true);
                  setNext(false);
                }}
                class="transition text-white hover:text-blue-500 mb-2"
              >
                About Us
              </a>
              <a
                href="#"
                onClick={() => {
                  setLanding(false);
                  setDefs(false);
                  setAbout(false);
                  setNext(true);
                }}
                class="text-white hover:text-blue-500 transition mb-2"
              >
                What's Next?
              </a>
            </div>
            {landing && (
              <div class="text-center mt-12">
                <div class="flex justify-center items-center space-x-5 mb-6">
                  <img
                    alt="Logo"
                    src="/phobiatestlogo.png"
                    class="w-[30rem] h-[20rem] mb-6"
                  ></img>
                </div>
                <h1 class="text-5xl font-bold mb-6">PhobiaTest</h1>
                <p class="text-xl mr-6 ml-6 mb-6">
                  PhobiaTest gives you a conclusive reading of your reactivity
                  to common phobias. Learn more about yourself through our
                  interactive analysis.
                </p>
                <button
                  class="transition bg-blue-400 text-white font-bold py-2 px-6 rounded-lg hover:scale-105 hover:bg-blue-600"
                  onClick={() => {
                    setStart(true);
                  }}
                >
                  Test me now!
                </button>
              </div>
            )}
            {defs && (
              <div class="text-center mt-28">
                <div class="flex justify-center items-center space-x-32 mb-6">
                  <img
                    alt="Logo"
                    src="/phobiatestlogo.png"
                    class="w-[30rem] h-[20rem] mb-6"
                  ></img>
                  <div>
                    <h1 class="text-5xl font-bold mb-6">Phobia Definitions</h1>
                    <ul class="text-xl mr-6 ml-6 mb-2">
                      <li>Claustrophobia: fear of confined places.</li>
                      <li>Trypophobia: fear of a pattern of holes. </li>
                      <li>Arachnophobia: fear of spiders.</li>
                      <li>Ophidiophobia: fear of snakes.</li>
                      <li>Coulrophobia: fear of clowns.</li>
                      <li>Galeophobia: fear of sharks</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {about && (
              <div class="text-center mt-12">
                <div class="flex justify-center items-center space-x-5 mb-6">
                  <img
                    alt="Logo"
                    src="/phobiatestlogo.png"
                    class="w-[30rem] h-[20rem] mb-6"
                  ></img>
                </div>
                <h1 class="text-5xl font-bold mb-6">About Us</h1>
                <p class="text-xl mr-14 ml-14 mb-6">
                  We are a team of five students from the University of Alberta.
                  We came together to create this project during the 2023
                  natHacks Hackathon with the idea of researching heart rate
                  responses to stimuli.
                </p>
              </div>
            )}
            {next && (
              <div class="text-center mt-12">
                <div class="flex justify-center items-center space-x-5 mb-6">
                  <img
                    alt="Logo"
                    src="/phobiatestlogo.png"
                    class="w-[30rem] h-[20rem] mb-6"
                  ></img>
                </div>
                <h1 class="text-5xl font-bold mb-6">What's Next?</h1>
                <p class="text-xl mr-6 ml-6 mb-6">
                  Generally, professionals state that fear and anxiety are
                  things that everyone will experience from time to time. It is
                  only when it is severe and long-lasting that it can become a
                  mental health problem. If you have genuine concerns about the
                  severity of a phobia, we recommend you contact a mental health
                  specialist.{" "}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
