import { Router, Application } from 'express';

import config from '../../config';
import { router as teamsRouter } from './teams.router';

export const routerApi: Function = (app: Application) => {
  const router = Router();
  app.use(config.api.prefix, router);
  router.use('/teams', teamsRouter);
}