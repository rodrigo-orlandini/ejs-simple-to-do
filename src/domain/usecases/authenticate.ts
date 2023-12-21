import { Injectable } from '@nestjs/common';

import { UseCase } from 'src/core/usecase';

import { UsersRepository } from 'src/domain/repositories/users-repository';
import { Hasher } from 'src/domain/cryptography/hasher';
import { Encrypter } from 'src/domain/cryptography/encrypter';

import { InvalidCredentialsError } from 'src/domain/errors/invalid-credentials';

interface AuthenticateUseCaseRequest {
  username: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  accessToken: string;
}

@Injectable()
export class AuthenticateUseCase implements UseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hasher: Hasher,
    private encrypter: Encrypter,
  ) {}

  public async execute({
    username,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isCorrectPassword = await this.hasher.compare(
      password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new InvalidCredentialsError();
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id,
    });

    return { accessToken };
  }
}
