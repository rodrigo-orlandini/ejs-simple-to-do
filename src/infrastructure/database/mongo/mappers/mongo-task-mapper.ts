import { Task } from 'src/domain/entities/task';
import { User } from 'src/domain/entities/user';

import { MongoUserMapper } from './mongo-user-mapper';

export class MongoTaskMapper {
  public static toDomain(raw: Record<string, any>, user: User): Task {
    return Task.create(
      {
        title: raw.title,
        description: raw.description,
        isCompleted: raw.isCompleted,
        createdAt: raw.createdAt,
        user: MongoUserMapper.toDomain(user),
      },
      raw._id,
    );
  }
}
