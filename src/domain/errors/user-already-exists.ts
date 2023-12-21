import { CustomError } from 'src/core/custom-error';

export class UserAlreadyExistsError extends Error implements CustomError {
  constructor(identifier: string) {
    super(`User "${identifier}" already exists.`);
  }
}
