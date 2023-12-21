import { CustomError } from 'src/core/custom-error';

export class InvalidCredentialsError extends Error implements CustomError {
  constructor() {
    super(`Username or password might be wrong.`);
  }
}
