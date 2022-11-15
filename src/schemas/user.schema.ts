import { Schema } from 'mongoose';

const selected_teams = new Schema({
  champion: String,
  runner_up: String,
  surnames: String,
}, {_id: false})

const match_result = new Schema({
  _id: String,
  local_score: Number,
  visitor_score: Number
})

export const userSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  names: {
    type: String,
    required: true,
  },
  surnames: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  selected_teams: {
    type: selected_teams
  },
  matches_result: {
    type: match_result
  }
}, {
  collection: 'users',
  versionKey: false
})