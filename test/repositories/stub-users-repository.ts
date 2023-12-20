import { User } from 'src/domain/entities/user';
import { UsersRepository } from 'src/domain/repositories/users-repository';

export class StubUsersRepository implements UsersRepository {
  public items: User[] = [];

  public async create(user: User): Promise<User> {
    this.items.push(user);

    return user;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const user = this.items.find((user) => user.username === username);

    if (!user) {
      return null;
    }

    return user;
  }
}
