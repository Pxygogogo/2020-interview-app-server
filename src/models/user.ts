import { Schema } from 'mongoose';

const userSchema = new Schema({
  openid: String,
  avatarUrl: String,
  city: String,
  country: String,
  gender: Number,
  language: String,
  nickName: String,
  province: String,
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
