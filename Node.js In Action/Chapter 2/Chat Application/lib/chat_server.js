var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nicknames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server) {
  // Start Socket.IO server, allowing it to use the existing HTTP server
  io = socketio.listen(server);

  io.set('log level', 1);

  // Define how each user connection will be handled
  io.sockets.on('connection', function(socket) {
    // Assign a user a guest name when they connect
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
    joinRoom(socket, 'Lobby'); // place user in Lobby when they connect

    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttemps(socket, nickNames, namesUsed);
    handleRoomJoining(socket); // handle room creation/changes

    socket.on('rooms', function() {
      socket.emit('rooms', io.sockets.manager.rooms);
    });
    // Define cleanup logic when user disconnects
    handleClientDisconnection(socket, nickNames, namesUsed);
  });
};
