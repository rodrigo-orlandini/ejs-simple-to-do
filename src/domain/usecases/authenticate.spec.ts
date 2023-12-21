import { AuthenticateUseCase } from './authenticate';

import { StubUsersRepository } from 'test/repositories/stub-users-repository';
import { StubHasher } from 'test/cryptography/stub-hasher';
import { StubEncrypter } from 'test/cryptography/stub-encrypter';

import { makeUser } from 'test/factories/makeUser';
import { InvalidCredentialsError } from '../errors/invalid-credentials';

let usersRepository: StubUsersRepository;
let hasher: StubHasher;
let encrypter: StubEncrypter;

let sut: AuthenticateUseCase;

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new StubUsersRepository();
    hasher = new StubHasher();
    encrypter = new StubEncrypter();

    sut = new AuthenticateUseCase(usersRepository, hasher, encrypter);
  });
  it('should be able to authenticate an user', async () => {
    const madeUser = makeUser({ password: await hasher.hash('12345678') });
    usersRepository.items.push(madeUser);

    const { accessToken } = await sut.execute({
      username: madeUser.username,
      password: '12345678',
    });

    expect(accessToken).toEqual(expect.any(String));
  });

  it('should not be able to authenticate an inexistent user', async () => {
    expect(async () => {
      await sut.execute({
        username: 'johndoe',
        password: '12345678',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate incorrect user password', async () => {
    const madeUser = makeUser();
    usersRepository.items.push(madeUser);

    expect(async () => {
      await sut.execute({
        username: madeUser.username,
        password: '12345678',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
