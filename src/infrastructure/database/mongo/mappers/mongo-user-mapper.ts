import { User } from 'src/domain/entities/user';

export class MongoUserMapper {
  public static toDomain(raw: Record<string, any>): User {
    return User.create(
      {
        username: raw.username,
        password: raw.password,
      },
      raw._id,
    );
  }
}
