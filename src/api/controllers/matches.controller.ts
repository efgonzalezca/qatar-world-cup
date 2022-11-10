import { NextFunction, Request, Response } from 'express';

import { MatchService } from '../../services';
import { getExtraParams, logger } from '../../utils';

export const getMatches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let matches = await MatchService.findAll()?.lean();
    logger.info('Read matches', getExtraParams(req));
    return res
      .status(200)
      .json(matches)
  } catch(err) {
    return next(err);
  }
}