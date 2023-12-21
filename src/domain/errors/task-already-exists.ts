import { CustomError } from 'src/core/custom-error';

export class TaskAlreadyExistsError extends Error implements CustomError {
  constructor(identifier: string) {
    super(`Task "${identifier}" already exists.`);
  }
}
