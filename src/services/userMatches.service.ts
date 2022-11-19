import { Connection, connections, Error, Model } from 'mongoose';

import config from '../config';
import { userMatchesSchema } from '../schemas';
import { IMatchResult } from '../types/IUser';

export interface matchData {
  user_id: string,
  match_id: string,
  local_score: number | null,
  visitor_score: number | null
}
export class UserMatchesService {
  private static dbName: string = config.dbNameApp;
  private static db: (Connection | undefined) = connections.find((conn) => {
    return conn.name === this.dbName;
  })
  private static model: (Model<IMatchResult> | null) = this.db === undefined ? null : this.db.model<IMatchResult>('user_matches', userMatchesSchema);
  
  constructor() {}

  static findAllByUser(user_id: string, projection={}) {
    this.createModel();
    if(this.model) {
      return this.model.find({user_id: user_id}, projection);
    }
    return;
  }

  static findByUserAndIdAndUpdate(user_id: string, match_id: string, update:{} ) {
    this.createModel();
    if(this.model) {
      return this.model.findOneAndUpdate({user_id: user_id, match_id: match_id}, update);
    }
    return;
  }

  static create(matchData: matchData) {
    this.createModel();
    if(this.model) {
      return this.model.create(matchData);
    }
    return;
  }

  static async createAll(matches: matchData[]) {
    
    for (let match of matches) {
      if(!(await this.exists(match.user_id ,match.match_id))) {
        await this.create(match)
      }
    }
  }

  static async exists(user_id: string, match_id: string) {
    this.createModel()
    if(this.model) {
      let user = await this.model.findOne({user_id: user_id, match_id: match_id}).lean();
      return user ? true : false;
    }
    return;
  }

  private static createModel() {
    this.validateConnection();
    if(!this.model) {
      this.model = this.db === undefined ? null : this.db.model<IMatchResult>('user_matches', userMatchesSchema);
    }
    if(!this.model) {
      throw new Error('Database not connected');
    }
  }

  private static validateConnection() {
    if(!this.db) {
      this.db = connections.find((conn) => {
        return conn.name === this.dbName;
      })
    }
  }
}