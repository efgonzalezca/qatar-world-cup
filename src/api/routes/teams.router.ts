import { Router } from 'express';

import { getTeams } from '../controllers';

export const router: Router = Router();

router.get(
  '/',
  getTeams
)