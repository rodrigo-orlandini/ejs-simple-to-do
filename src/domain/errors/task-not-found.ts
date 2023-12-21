import { CustomError } from 'src/core/custom-error';

export class TaskNotFoundError extends Error implements CustomError {
  constructor(identifier: string) {
    super(`Task "${identifier}" was not found.`);
  }
}
