import { NextFunction, Request, Response } from 'express';

import { UserService, UserMatchesService, MatchService } from '../../services';
import { matchData } from '../../services/userMatches.service';
import { getExtraParams, logger, ErrorHandler } from '../../utils';

interface register {
  document: string,
  names: string,
  surnames: string,
  password: string
}

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

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      document,
      names,
      surnames,
      password
    } = <register>req.body;

    const user = await UserService.exists(document);
    
    if(user) {
      throw new ErrorHandler(400, 40003, 'User exists');
    }

    let newUser = {
      _id: document,
      names: names,
      surnames: surnames,
      password: password,
      score: 0,
      selected_teams: {
        champion: null,
        runner_up: null,
        third_place: null
      }
    }

    await UserService.create(newUser)

    const matches = await MatchService.findAll()?.lean();
    
    const userMatches = matches?.map((match) => {
      return {
        user_id: document,
        match_id: match._id,
        local_score: null,
        visitor_score: null
      }
    })

    await UserMatchesService.createAll(<matchData[]>userMatches)

    logger.info(`Created user ${document}`, getExtraParams(req));
    return res
      .status(201)
      .json({
        message: 'User created',
        id: document
      })
  } catch(err) {
    return next(err);
  }
}