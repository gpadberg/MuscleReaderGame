import React from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function App() {
  // Set the socketURL, messageHistory and 
  const [socketUrl, setSocketUrl] = React.useState('ws://localhost:8080'); // Your WebSocket server URL
  const [messageHistory, setMessageHistory] = React.useState([]);
  const [inputMessage, setInputMessage] = React.useState('')
  // Variable to store the python output
  const [pythonOutput, setPythonOutput] = React.useState('');


  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log('Opened!'),
    onClose: () => console.log('Closed!'),
    shouldReconnect: (closeEvent) => true, // Automatically reconnect
  });

  React.useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prev => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const handleClickSendMessage = (message) => {
    sendMessage(message);
  };


  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const handleRunPythonScript = async () => {
    try {
      const response = await fetch('http://localhost:3001/run-python'); 
      const data = await response.text();
      console.log('Python script output:', data);
      setPythonOutput(data); // Set the Python output
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleRunPythonScript}>
        Run Python File
      </button>
      <br></br>
      <span>The WebSocket is currently {connectionStatus}<br></br></span>
      <div>Python Script Output: {pythonOutput}</div>
    </div>
  );
}

export default App;
