import { Task } from 'src/domain/entities/task';

export abstract class TasksRepository {
  abstract create(task: Task): Promise<Task>;
  abstract update(task: Task): Promise<Task>;
  abstract findById(id: string): Promise<Task | null>;
  abstract findByTitle(title: string): Promise<Task | null>;
  abstract findManyByUserId(userId: string): Promise<Task[] | null>;
}
