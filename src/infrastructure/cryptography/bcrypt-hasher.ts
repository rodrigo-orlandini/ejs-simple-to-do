import { compare, hash } from 'bcryptjs';

import { Hasher } from 'src/domain/cryptography/hasher';

export class BcryptHasher implements Hasher {
  private SALT_ROUNDS = 8;

  public async hash(plain: string): Promise<string> {
    return await hash(plain, this.SALT_ROUNDS);
  }

  public async compare(plain: string, hashed: string): Promise<boolean> {
    return await compare(plain, hashed);
  }
}
