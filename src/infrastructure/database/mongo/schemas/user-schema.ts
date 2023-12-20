import { Schema } from 'mongoose';

export const USER_MODEL_NAME = 'users';

export const USER_MODEL_SCHEMA = new Schema({
  username: String,
  password: String,
});
