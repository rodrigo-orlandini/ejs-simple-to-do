import { FetchUserTasksUseCase } from './fetch-user-tasks';

import { User } from '../entities/user';

import { StubUsersRepository } from 'test/repositories/stub-users-repository';
import { StubTasksRepository } from 'test/repositories/stub-tasks-repository';

import { makeUser } from 'test/factories/makeUser';
import { makeTask } from 'test/factories/makeTask';

import { UserNotFoundError } from '../errors/user-not-found';

let usersRepository: StubUsersRepository;
let tasksRepository: StubTasksRepository;

let sut: FetchUserTasksUseCase;

describe('Fetch user tasks use case', () => {
  beforeEach(() => {
    usersRepository = new StubUsersRepository();
    tasksRepository = new StubTasksRepository();

    sut = new FetchUserTasksUseCase(usersRepository, tasksRepository);
  });
  it('should be able to fetch user tasks', async () => {
    const madeUser = makeUser();
    usersRepository.items.push(madeUser);

    const madeTask1 = makeTask({ user: madeUser });
    tasksRepository.items.push(madeTask1);

    const madeTask2 = makeTask({ user: madeUser });
    tasksRepository.items.push(madeTask2);

    const madeTask3 = makeTask({ user: madeUser });
    tasksRepository.items.push(madeTask3);

    const madeOtherUserTask = makeTask();
    tasksRepository.items.push(madeOtherUserTask);

    const { tasks } = await sut.execute({
      userId: madeUser.id,
    });

    expect(tasks).toHaveLength(3);
    expect(tasks).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          props: expect.objectContaining({
            title: madeTask1.title,
            description: madeTask1.description,
            user: expect.any(User),
          }),
        }),
      ]),
    );
  });

  it('should not be able to fetch tasks for inexistent user', async () => {
    expect(async () => {
      await sut.execute({
        userId: 'fake-user-id',
      });
    }).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it('should be able to return an empty array when fetching inexistent tasks', async () => {
    const madeUser = makeUser();
    usersRepository.items.push(madeUser);

    const { tasks } = await sut.execute({
      userId: madeUser.id,
    });

    expect(tasks).toHaveLength(0);
    expect(tasks).toEqual(expect.any(Array));
  });
});
