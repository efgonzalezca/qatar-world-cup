import cors from 'cors';
import { Application } from 'express';

import { routerApi } from '../api/routes';
import { errorHandler, routeHandler } from '../api/middlewares';

export const expressLoader: Function = (app: Application) => {
  app.use(cors({origin: '*'}));
  routerApi(app);
  app.use(errorHandler);
  app.use(routeHandler);
}