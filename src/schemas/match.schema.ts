import { Schema } from 'mongoose';

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
    type: String,
    required: true,
  },
}, {
  collection: 'matches',
  versionKey: false
})