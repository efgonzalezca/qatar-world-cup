import { Schema } from 'mongoose';

export const userMatchesSchema = new Schema({
  _id: {
    type: Object,
  },
  user_id: {
    type: String,
    required: true,
  },
  match_id: {
    type: String,
    required: true,
  },
  local_score: {
    type: Number,
    required: true,
  },
  visitor_score: {
    type: Number,
    required: true,
  }
}, {
  collection: 'users_matches',
  versionKey: false
})