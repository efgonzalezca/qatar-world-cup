import { Application } from 'express';
import { Server as IOServer } from 'socket.io';

import { expressLoader } from './express.loader';
import { socketioLoader } from './socketio.loader';
import { logger } from '../utils';

export const createApp: Function = async (app: Application) => {
  await expressLoader(app);
  logger.info('Express loaded');
}

export const createSocket: Function = async (io: IOServer) => {
  await socketioLoader(io)
}