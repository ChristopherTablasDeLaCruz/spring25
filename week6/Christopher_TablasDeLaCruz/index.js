const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.join("some room");

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

io.of("/").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`);
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});