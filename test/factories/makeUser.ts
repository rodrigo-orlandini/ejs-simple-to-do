import { faker } from '@faker-js/faker';

import { User, UserProps } from 'src/domain/entities/user';

export const makeUser = (override: Partial<UserProps> = {}, id?: string) => {
  const user = User.create(
    {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  return user;
};
