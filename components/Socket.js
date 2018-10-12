import React from 'react';
import io from 'socket.io';


const createSocket = (io) => {
  const socket = io();
  return socket
}

const unplannedSocket = (socket, data) => {
  socket.emit('unplannedRoute', data)
}

export createSocket;
export unplannedSocket;
