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

export const updateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { local_score, visitor_score } = req.body
  try {
    console.log(local_score, visitor_score)
    let updatedMatch = await MatchService.updateById(id, local_score, visitor_score)?.lean();
    //TODO: update all user score
    logger.info(`Update match ${id}`, getExtraParams(req));
    return res
      .status(200)
      .json({
        message: `Match ${updatedMatch?._id} updated`
      })
  } catch(err) {
    return next(err);
  }
}