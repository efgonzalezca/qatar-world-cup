import { Router, Application } from 'express';

import config from '../../config';
import { router as teamsRouter } from './teams.router';
import { router as matchesRouter } from './matches.router';

export const routerApi: Function = (app: Application) => {
  const router = Router();
  app.use(config.api.prefix, router);
  router.use('/teams', teamsRouter);
  router.use('/matches', matchesRouter);
}