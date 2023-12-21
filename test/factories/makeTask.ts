import { faker } from '@faker-js/faker';

import { Task, TaskProps } from 'src/domain/entities/task';

import { makeUser } from './makeUser';

export const makeTask = (override: Partial<TaskProps> = {}, id?: string) => {
  const user = makeUser();

  const task = Task.create(
    {
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
      isCompleted: faker.datatype.boolean(),
      createdAt: new Date(),
      user,
      ...override,
    },
    id,
  );

  return task;
};
