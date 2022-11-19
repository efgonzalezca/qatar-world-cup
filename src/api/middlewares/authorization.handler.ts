import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';

import config from '../../config';
import { ErrorHandler } from '../../utils';

export const verifyJWT = (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization')?.split(' ');
  
  if(authorization?.length != 2 || authorization[0] != 'Bearer') {
    throw new ErrorHandler(401, 40101, 'Error in header authorization');
  }

  try {
    verify(authorization[1], config.secretKey);
    next();
  } catch (err) {
    if(err instanceof TokenExpiredError) {
      throw new ErrorHandler(401, 40102, 'Your session has expired');
    }
    throw new ErrorHandler(401, 40103, 'Authorization error');
  }
}