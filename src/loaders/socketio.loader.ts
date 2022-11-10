import { Server as IOServer, Socket } from 'socket.io';

import { logger } from '../utils';

export const socketioLoader: Function = (io: IOServer) => {

  io.on('connection', (socket: Socket) => {
    logger.info(`Client connected ${socket.id}`);
    
    socket.on('msg-to-server', (_data: Object) => {
      //TODO: emit or print data event test
    })

    socket.emit('test', {name: 'Desarrollo & Analítica', date: new Date()});
  });
}