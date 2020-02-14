import { Schema } from 'mongoose';

const userSchema = new Schema({
  openid: String,
  nickname: String,
  avatar: String,
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at',
  },
});

export default {
  name: 'User',
  schema: userSchema,
  collection: 'users',
};
