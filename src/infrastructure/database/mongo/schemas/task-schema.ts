import mongoose, { HydratedDocument } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/domain/entities/user';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
class Task {
  @Prop()
  _id!: string;

  @Prop({ unique: true, required: true })
  title!: string;

  @Prop()
  description!: string;

  @Prop()
  isCompleted!: boolean;

  @Prop()
  createdAt!: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  user!: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
