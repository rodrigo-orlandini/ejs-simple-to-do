import { Entity } from 'src/core/entity';

import { User } from './user';

export interface TaskProps {
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  user: User;
}

export class Task extends Entity<TaskProps> {
  public static create(props: TaskProps, id?: string): Task {
    const task = new Task(props, id);

    return task;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  set isCompleted(isCompleted: boolean) {
    this.props.isCompleted = isCompleted;
  }

  get isCompleted() {
    return this.props.isCompleted;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get user() {
    return this.props.user;
  }
}
