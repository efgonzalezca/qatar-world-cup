import { Schema } from 'mongoose';

//TODO: create schema to team --> local_team - visiting_team

export const matchSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  has_played: {
    type: Boolean,
    required: true,
  },
}, {
  collection: 'matches',
  versionKey: false
})