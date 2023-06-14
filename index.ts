import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';

import socketHandler from './socketHandler';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    path: '/api/socket.io', 
    cors: { origin: '*' },
});

const PORT = process.env.PORT || 3000;

socketHandler(io);

server.listen(PORT, () => {
  console.log('listening on *:' + PORT);
});
