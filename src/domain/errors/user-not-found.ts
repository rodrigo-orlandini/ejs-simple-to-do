import { CustomError } from 'src/core/custom-error';

export class UserNotFoundError extends Error implements CustomError {
  constructor(identifier: string) {
    super(`User "${identifier}" was not found.`);
  }
}
