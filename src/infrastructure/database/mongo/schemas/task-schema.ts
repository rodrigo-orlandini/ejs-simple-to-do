import { Schema } from 'mongoose';

export const TASK_MODEL_NAME = 'tasks';

export const TASK_MODEL_SCHEMA = new Schema({
  title: String,
  description: String,
  isCompleted: Boolean,
  createdAt: Date,
  userId: String,
});
