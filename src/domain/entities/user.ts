import { Entity } from 'src/core/entity';

export interface UserProps {
  username: string;
  password: string;
}

export class User extends Entity<UserProps> {
  public static create(props: UserProps, id?: string): User {
    const user = new User(props, id);

    return user;
  }

  get username() {
    return this.props.username;
  }

  get password() {
    return this.props.password;
  }
}
