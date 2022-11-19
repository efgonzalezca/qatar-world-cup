import { json, Router } from 'express';

import { getUsersRanking, modifyMatchFromUser, register, updateUser } from '../controllers';
import { validatorHandler, verifyJWT } from '../middlewares';

export const router: Router = Router();

router.patch(
  '/:userId/matches/:id',
  json(),
  verifyJWT,
  validatorHandler('modifyMatchFromUserParams', 'params'),
  validatorHandler('modifyMatchFromUserBody', 'body'),
  modifyMatchFromUser
)

router.get(
  '/',
  verifyJWT,
  getUsersRanking
)

router.post(
  '/',
  json(),
  validatorHandler('register', 'body'),
  register
)

router.patch(
  '/:id',
  json(),
  verifyJWT,
  validatorHandler('userUpdateParams', 'params'),
  validatorHandler('userUpdateBody', 'body'),
  updateUser
)