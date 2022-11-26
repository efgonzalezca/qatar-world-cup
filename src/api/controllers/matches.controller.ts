import { NextFunction, Request, Response } from 'express';

import { MatchService, UserMatchesService, UserService } from '../../services';
import { IMatch } from '../../types';
import { getExtraParams, getPointsMatch, logger } from '../../utils';

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
  const { local_score, visitor_score } = req.body;
  try {
    let updatedMatch = await MatchService.updateById(id, local_score, visitor_score)?.lean();
    let users = await UserService.findAll()?.lean();
    let updatedUsers = [];
    if(users){
      for (const user of users) {
        let userMatch = await UserMatchesService.findByUserAndMatch(user._id, id)?.lean();
        let matchPoint = getPointsMatch(<IMatch>updatedMatch, <number>userMatch?.local_score, <number>userMatch?.visitor_score);
        await UserMatchesService.updateMatchPoints(user._id, id, matchPoint);
        let updatedUser = {
          _id: user._id,
          score: user.score,
          points: matchPoint
        }
        updatedUsers.push(updatedUser);
      }
    }
    await UserService.updateUsersScore(updatedUsers);
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