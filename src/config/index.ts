import { config } from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  api: {
    prefix: '/api/v1',
  },
  dbNameApp: process.env.DB_NAME_APP || 'suequipo',
  dbUriApp: process.env.MONGO_URI_APP || 'mongodb://localhost:27017',
  logFile: process.env.LOG_FILE || `${ __dirname }/../../logs/debug.log`,
  port: process.env.PORT || '4500'
}