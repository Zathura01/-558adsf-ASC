const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const port = 2500;

app.use(cors());
app.use(express.json());
require('./services/Mongodbsetup');

const server = http.createServer(app);

const io = new Server(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('joinEventRoom', (eventId) => {
    socket.join(eventId.toString());
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

module.exports.getIO = () => io;

// Routes
app.use('/userActivity', require('./routes/UserRoutes'));
app.use('/events', require('./routes/UserEvents'));
app.use('/getData', require('./routes/UserWall'));
app.use('/getEvents', require('./routes/EventsWall'));

// Static files
app.use('/getImg', express.static(path.join(__dirname,'uploads','images')));
app.use('/getVid', express.static(path.join(__dirname,'uploads','videos')));

// Start server
server.listen(port, () => {
  console.log('Server with Socket.IO running on port', port);
});
