import { UseCase } from 'src/core/usecase';

import { User } from '../entities/user';

import { UsersRepository } from '../repositories/users-repository';
import { Hasher } from '../cryptography/hasher';

import { UserAlreadyExistsError } from '../errors/user-already-exists-error';

interface CreateUserUseCaseRequest {
  username: string;
  password: string;
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUser implements UseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hasher: Hasher,
  ) {}

  public async execute({
    username,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userOnDatabase = await this.usersRepository.findByUsername(username);

    if (userOnDatabase) {
      throw new UserAlreadyExistsError(username);
    }

    const hashedPassword = await this.hasher.hash(password);

    const user = User.create({
      username,
      password: hashedPassword,
    });

    await this.usersRepository.create(user);

    return { user };
  }
}
