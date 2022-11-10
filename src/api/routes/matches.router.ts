import { Router } from 'express';

import { getMatches } from '../controllers';

export const router: Router = Router();

router.get(
  '/',
  getMatches
)