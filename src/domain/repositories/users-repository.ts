import { User } from 'src/domain/entities/user';

export abstract class UsersRepository {
  abstract create(user: User): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByUsername(username: string): Promise<User | null>;
}
