import { CreateTaskUseCase } from './create-task';

import { User } from '../entities/user';

import { StubUsersRepository } from 'test/repositories/stub-users-repository';
import { StubTasksRepository } from 'test/repositories/stub-tasks-repository';

import { makeUser } from 'test/factories/makeUser';
import { makeTask } from 'test/factories/makeTask';

import { TaskAlreadyExistsError } from '../errors/task-already-exists';
import { UserNotFoundError } from '../errors/user-not-found';

let usersRepository: StubUsersRepository;
let tasksRepository: StubTasksRepository;

let sut: CreateTaskUseCase;

describe('Create task use case', () => {
  beforeEach(() => {
    usersRepository = new StubUsersRepository();
    tasksRepository = new StubTasksRepository();

    sut = new CreateTaskUseCase(usersRepository, tasksRepository);
  });
  it('should be able to create a task', async () => {
    const madeUser = makeUser();
    usersRepository.items.push(madeUser);

    const { task } = await sut.execute({
      userId: madeUser.id,
      title: 'Test task title',
      description: 'Test task description',
    });

    expect(task).toMatchObject({
      _id: expect.any(String),
      props: expect.objectContaining({
        title: 'Test task title',
        description: 'Test task description',
        user: expect.any(User),
      }),
    });
  });

  it('should not be able to create a task for inexistent user', async () => {
    expect(async () => {
      await sut.execute({
        userId: 'fake-user-id',
        title: 'Test task title',
        description: 'Test task description',
      });
    }).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it('should not be able to create two tasks with same title', async () => {
    const madeUser = makeUser();
    usersRepository.items.push(madeUser);

    const madeTask = makeTask({ user: madeUser });
    tasksRepository.items.push(madeTask);

    expect(async () => {
      await sut.execute({
        userId: madeUser.id,
        title: madeTask.title,
        description: 'Test task description',
      });
    }).rejects.toBeInstanceOf(TaskAlreadyExistsError);
  });
});
