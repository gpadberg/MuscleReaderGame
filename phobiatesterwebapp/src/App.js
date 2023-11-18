// import './App.css';
// import Header from './components/Header';
// import React, { useState, useEffect } from 'react';
// import StartPage from './components/StartPage';
// import TestInterface from './components/TestInterface';
// import ResultsPage from './components/ResultsPage';
// import WhatsNextPage from './components/WhatsNextPage';
// import PhobiaDefinitions from './components/PhobiaDefinitions';
// import AboutUs from './components/AboutUs';
// import ImageChanger from './components/ImageChanger';
// import useWebSocket, { ReadyState } from 'react-use-websocket';

// function App() {

//   const [landing, setLanding] = useState(true)
//   const [defs, setDefs] = useState(false)
//   const [about, setAbout] = useState(false)
//   const [next, setNext] = useState(false)
//   const [start, setStart] = useState(false)
//   // Set the socketURL
//   const [socketUrl, setSocketUrl] = React.useState('ws://localhost:8080'); // Your WebSocket server URL
//   // Variable to store the python output
//   const [pythonOutput, setPythonOutput] = React.useState('');
//   const [command, setCommand] = React.useState(''); // State to hold the command

//   // const handleRunPythonScript = async () => {
//   //   try {
//   //     const response = await fetch('http://localhost:3001/run-python'); 
//   //     const data = await response.text();
//   //     console.log('Python script output:', data);
//   //     setPythonOutput(data); // Set the Python output
//   //   } catch (error) {
//   //     console.error('Error:', error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   handleRunPythonScript();
//   // }, []);

//   const sendCommand = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/send-command', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ command }),
//       });

//       if (response.ok) {
//         console.log('Command sent successfully');
//         // Handle success response
//       } else {
//         console.error('Error sending command');
//         // Handle error response
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <div class="bg-black text-white min-h-screen">
//       <div>
//       <input
//         type="text"
//         value={command}
//         onChange={(e) => setCommand(e.target.value)}
//       />
//       <button onClick={sendCommand}>Send Command</button>
//       <br></br>
//       <div>Python Script Output: {pythonOutput}</div>
//     </div>
//         {start ? <ImageChanger /> : <>
//         <div class="flex justify-between w-full px-96 pt-8">
//         <a href="#" onClick={()=> {setLanding(true); setDefs(false); setAbout(false); setNext(false)}} class="text-white mb-2">Home</a>
//           <a href="#" onClick={()=> {setLanding(false); setDefs(true); setAbout(false); setNext(false)}} class="text-white mb-2">Phobia Definitions</a>
//           <a href="#" onClick={()=> {setLanding(false); setDefs(false); setAbout(true); setNext(false)}} class="text-white mb-2">About Us</a>
//           <a href="#" onClick={()=> {setLanding(false); setDefs(false); setAbout(false); setNext(true)}} class="text-white mb-2">What's Next?</a>
//         </div>
//       {landing && 
//         <div class="text-center mt-28">
//           <div class="flex justify-center items-center space-x-5 mb-8">
//             <img alt="Logo" src="/phobiatestlogo.png" class="w-[30rem] h-[20rem] mb-6"></img>
//           </div>
//           <h1 class="text-5xl font-bold mb-14">PhobiaTester</h1>
//           <p class="text-xl mr-6 ml-6 mb-14">PhobiaTester gives you a conclusive reading of your reactivity to common phobias. Learn more about yourself through our interactive analysis.</p>
//           <button class="bg-blue-500 text-white font-bold py-2 px-6 rounded" onClick={() => {setStart(true)}}>
//             Test me now!
//           </button>
//         </div>
//       }
//       {defs &&    
//     <div class="text-center mt-28">
//       <div class="flex justify-center items-center space-x-5 mb-8">
//         <img alt="Logo" src="/phobiatestlogo.png" class="w-[30rem] h-[20rem] mb-6"></img>
//       </div>
//       <h1 class="text-5xl font-bold mb-14">Phobia Definitions</h1>
//       <ul class="text-xl mr-6 ml-6 mb-2">
//         <li>Claustrophobia: fear of confined places.</li>
//         <li>Trypophobia: fear of a pattern of holes. </li>
//         <li>Arachnophobia: fear of spiders.</li>
//         <li>Ophidiophobia: fear of snakes.</li>
//         <li>Coulrophobia: fear of clowns.</li>
//         <li>Galeophobia: fear of sharks</li>
//         </ul>
//     </div>
//   }
//   {about && <div class="text-center mt-28">
//       <div class="flex justify-center items-center space-x-5 mb-8">
//         <img alt="Logo" src="/phobiatestlogo.png" class="w-[30rem] h-[20rem] mb-6"></img>
//       </div>
//       <h1 class="text-5xl font-bold mb-14">About Us</h1>
//       <p class="text-xl mr-14 ml-14 mb-14">We are a team of five students from the University of Alberta. We came together to create this project during the 2023 natHacks Hackathon with the idea of researching heart rate responses to stimuli.</p>
//     </div>}
//   {next && <div class="text-center mt-28">
//       <div class="flex justify-center items-center space-x-5 mb-8">
//         <img alt="Logo" src="/phobiatestlogo.png" class="w-[30rem] h-[20rem] mb-6"></img>
//       </div>
//       <h1 class="text-5xl font-bold mb-14">What's Next?</h1>
//       <p class="text-xl mr-6 ml-6 mb-14">Generally, professionals state that fear and anxiety are things that everyone will experience from time to time. It is only when it is severe and long-lasting that it can become a mental health problem. If you have genuine concerns about the severity of a phobia, we recommend you contact a mental health specialist. </p>
//     </div>}
//     </>}

//     </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function App() {
  const [socketUrl, setSocketUrl] = React.useState('ws://localhost:8080'); // Your WebSocket server URL
  const [pythonOutput, setPythonOutput] = React.useState('');
  
    const handleRunPythonScript = async (command) => {
      try {

        const url = new URL('http://localhost:3001/run-python');
        url.searchParams.append('command', command); 
        
        const response = await fetch(url);
        
        const data = await response.text();
        console.log('Python script output:', data);
        console.log("Command sent", command)
        setPythonOutput(data); // Set the Python output
      } catch (error) {
        console.error('Error:', error);
      }
    };

  return (
    <div>
      <button onClick={() => handleRunPythonScript('reset')}>
        Reset
      </button>
      <span><br></br></span>
      <button onClick={() => handleRunPythonScript('advance')}>
        Advance
      </button>
      <span><br></br></span>
      <button onClick={() => handleRunPythonScript('calculate')}>
        Compute
      </button>
      <div>Python Script Output: {pythonOutput}</div>
      <span><br></br></span>
    </div>
  );
}
export default App;