import React from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function App() {
  const [socketUrl, setSocketUrl] = React.useState('ws://localhost:8080'); // Your WebSocket server URL
  const [messageHistory, setMessageHistory] = React.useState([]);

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

  return (
    <div>
      <button onClick={() => handleClickSendMessage('Hello Server!')}>
        Send Message
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {messageHistory.map((message, idx) => (
        <span key={idx}>{message.data}</span>
      ))}
    </div>
  );
}

export default App;
