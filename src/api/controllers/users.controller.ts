import { NextFunction, Request, Response } from 'express';

import { UserService, UserMatchesService } from '../../services';
import { getExtraParams, logger, ErrorHandler } from '../../utils';

export const modifyMatchFromUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id, userId } = req.params
  const { local_score, visitor_score } = req.body
  try {
    let user = await UserService.findById(userId)?.lean();
    if(!user) {
      throw new ErrorHandler(404, 40401, 'User or match not found')
    }
    const userMatchUpdated = await UserMatchesService.findByUserAndIdAndUpdate(userId, id, {local_score, visitor_score})?.lean();
    console.log(userMatchUpdated)
    logger.info(`Modify match ${id} from user ${user}`, getExtraParams(req));
    return res
      .status(200)
      .json({
        message: 'User match updated'
      })
  } catch(err) {
    return next(err);
  }
}

export const getUsersRanking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let users = await UserService.findAll({score: true, names: true})?.lean();
    logger.info('Read usermatches', getExtraParams(req));
    return res
      .status(200)
      .json(users)
  } catch(err) {
    return next(err);
  }
}