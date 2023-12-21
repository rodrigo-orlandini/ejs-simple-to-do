import { CompleteTaskUseCase } from './complete-task';

import { StubUsersRepository } from 'test/repositories/stub-users-repository';
import { StubTasksRepository } from 'test/repositories/stub-tasks-repository';

import { makeUser } from 'test/factories/makeUser';
import { makeTask } from 'test/factories/makeTask';

import { UserNotFoundError } from '../errors/user-not-found';
import { TaskNotFoundError } from '../errors/task-not-found';

let usersRepository: StubUsersRepository;
let tasksRepository: StubTasksRepository;

let sut: CompleteTaskUseCase;

describe('Complete task use case', () => {
  beforeEach(() => {
    usersRepository = new StubUsersRepository();
    tasksRepository = new StubTasksRepository();

    sut = new CompleteTaskUseCase(usersRepository, tasksRepository);
  });
  it('should be able to complete task', async () => {
    const madeUser = makeUser();
    usersRepository.items.push(madeUser);

    const madeTask = makeTask({ user: madeUser, isCompleted: false });
    tasksRepository.items.push(madeTask);

    const { task } = await sut.execute({
      userId: madeUser.id,
      taskId: madeTask.id,
    });

    expect(task).toMatchObject(
      expect.objectContaining({
        props: expect.objectContaining({
          title: madeTask.title,
          isCompleted: true,
        }),
      }),
    );
  });

  it('should not be able to complete task for an inexistent user', async () => {
    const madeTask = makeTask();
    tasksRepository.items.push(madeTask);

    expect(async () => {
      await sut.execute({
        userId: 'fake-user-id',
        taskId: madeTask.id,
      });
    }).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it('should not be able to complete task for an inexistent user', async () => {
    const madeUser = makeUser();
    usersRepository.items.push(madeUser);

    expect(async () => {
      await sut.execute({
        userId: madeUser.id,
        taskId: 'fake-task-id',
      });
    }).rejects.toBeInstanceOf(TaskNotFoundError);
  });

  it('should not be able to complete task for different user', async () => {
    const madeUser = makeUser();
    usersRepository.items.push(madeUser);

    const madeOtherUser = makeUser();
    usersRepository.items.push(madeOtherUser);

    const madeTask = makeTask({ user: madeUser });
    tasksRepository.items.push(madeTask);

    expect(async () => {
      await sut.execute({
        userId: madeOtherUser.id,
        taskId: madeTask.id,
      });
    }).rejects.toBeInstanceOf(TaskNotFoundError);
  });
});
