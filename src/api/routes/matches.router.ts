import { Router } from 'express';

import { getMatches } from '../controllers';
import { verifyJWT } from '../middlewares';

export const router: Router = Router();

router.get(
  '/',
  verifyJWT,
  getMatches
)