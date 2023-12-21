import { Task } from 'src/domain/entities/task';

export abstract class TasksRepository {
  abstract create(task: Task): Promise<Task>;
  abstract findByTitle(title: string): Promise<Task | null>;
}
