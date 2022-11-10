/* Development environment */
import dotenv from 'dotenv';
dotenv.config();

import { Server as HTTPServer } from 'http';

import express, { Application } from 'express';
import { Server as IOServer } from 'socket.io';

import config from './config';
import { logger } from './utils';
import { createApp, createSocket } from './loaders';
import { mongooseLoader } from './loaders/mongoose.loader';


const startServer: Function = () => {
  mongooseLoader(config.dbUriApp, config.dbNameApp);
  const app: Application = express();
  createApp(app);
  const httpServer: HTTPServer = new HTTPServer(app);
  const io = new IOServer(httpServer, {
    cors: {
      origin: '*'
    }
  });
  createSocket(io);

  httpServer.listen(config.port, () => {
    console.log(`Server running on: http://localhost:${config.port}`);
    logger.info('HTTP server connected');
  })
  .on('error', (err) => {
    logger.error('Connection failed', err.message);
    process.exit(1);
  })
}

startServer();