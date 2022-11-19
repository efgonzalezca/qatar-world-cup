import { Connection, connections, Error, Model } from 'mongoose';

import config from '../config';
import { IUser } from '../types';
import { userSchema } from '../schemas';
import { generatePassword } from '../utils';

interface userData {
  _id: string,
  password: string,
  names: string,
  surnames: string,
  score: number,
  selected_teams: {
    champion: string | null,
    runner_up: string | null,
    third_place: string | null,
  }
}
export class UserService {
  private static dbName: string = config.dbNameApp;
  private static db: (Connection | undefined) = connections.find((conn) => {
    return conn.name === this.dbName;
  })
  private static model: (Model<IUser> | null) = this.db === undefined ? null : this.db.model<IUser>('user', userSchema);
  
  constructor() {}

  static findById(id: string) {
    this.createModel();
    if(this.model) {
      return this.model.findById(id);
    }
    return;
  }

  static findAll(projection={}) {
    this.createModel();
    if(this.model) {
      return this.model.find({}, projection);
    }
    return;
  }

  static create(userData: userData) {
    this.createModel();
    if(this.model) {
      userData.password = generatePassword(userData.password);
      return this.model.create(userData);
    }
    return;
  }

  static async exists(id: string) {
    this.createModel()
    if(this.model) {
      let user = await this.model.findById(id).lean();
      return user ? true : false;
    }
    return;
  }

  private static createModel() {
    this.validateConnection();
    if(!this.model) {
      this.model = this.db === undefined ? null : this.db.model<IUser>('user', userSchema);
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