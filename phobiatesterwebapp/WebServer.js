const WebSocket = require('ws');
const express = require('express');
const { exec } = require('child_process');
const app = express();

// To allow reference between ports
const cors = require('cors');
app.use(cors());


// Set up the WebSocket server
const wss = new WebSocket.Server({ noServer: true });
wss.on('connection', (ws) => {
  console.log('A new client connected!');
  ws.on('message', (message) => {
    console.log('received: %s', message);
    ws.send(`Server received: ${message}`);
  });
  ws.send('Welcome to the WebSocket server!');
});

// HTTP endpoint to run Python script
app.get('/run-python', (req, res) => {
  exec('python3 ../testpython/randgen.py', (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).send('Error running script ${stderr}');
    }
    res.send(stdout);
  });
});

// Create an HTTP server
const server = app.listen(3001, () => {
  console.log('HTTP server listening on http://localhost:3001');
});

// Attach WebSocket server to the same HTTP server
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
