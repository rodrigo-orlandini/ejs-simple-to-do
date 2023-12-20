import { Entity } from 'src/core/entity';

export interface TaskProps {
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: Date;
  userId: string;
}

export class Task extends Entity<TaskProps> {
  public static create(props: TaskProps, id?: string): Task {
    const task = new Task(props, id);

    return task;
  }
}
