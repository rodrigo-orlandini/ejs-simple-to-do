import { Task } from 'src/domain/entities/task';
import { TasksRepository } from 'src/domain/repositories/tasks-repository';

export class StubTasksRepository implements TasksRepository {
  public items: Task[] = [];

  public async create(task: Task): Promise<Task> {
    this.items.push(task);

    return task;
  }

  public async findByTitle(title: string): Promise<Task | null> {
    const task = this.items.find((task) => task.title === title);

    if (!task) {
      return null;
    }

    return task;
  }
}
