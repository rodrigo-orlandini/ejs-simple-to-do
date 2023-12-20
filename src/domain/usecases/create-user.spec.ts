import { CreateUserUseCase } from './create-user';

import { StubUsersRepository } from 'test/repositories/stub-users-repository';
import { StubHasher } from 'test/cryptography/stub-hasher';

import { makeUser } from 'test/factories/makeUser';
import { UserAlreadyExistsError } from 'src/domain/errors/user-already-exists-error';

let usersRepository: StubUsersRepository;
let hasher: StubHasher;

let sut: CreateUserUseCase;

describe('Create user use case', () => {
  beforeEach(() => {
    usersRepository = new StubUsersRepository();
    hasher = new StubHasher();

    sut = new CreateUserUseCase(usersRepository, hasher);
  });
  it('should be able to create an user', async () => {
    const password = '12345678';

    const { user } = await sut.execute({
      username: 'johndoe',
      password,
    });

    expect(user).toMatchObject({
      _id: expect.any(String),
      props: {
        username: 'johndoe',
        password: await hasher.hash(password),
      },
    });
  });

  it('should not be able to create two users with same username', async () => {
    const madeUser = makeUser();
    usersRepository.items.push(madeUser);

    expect(async () => {
      await sut.execute({
        username: madeUser.username,
        password: '12345678',
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
