import { User } from '../entities/user';

export abstract class UsersRepository {
  abstract create(user: User): Promise<User>;
  abstract findByUsername(username: string): Promise<User | null>;
}
