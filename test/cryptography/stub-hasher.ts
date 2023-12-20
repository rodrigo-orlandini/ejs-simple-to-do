import { Hasher } from 'src/domain/cryptography/hasher';

export class StubHasher implements Hasher {
  public async hash(plain: string): Promise<string> {
    return `${plain}-hashed`;
  }

  public async compare(plain: string, hashed: string): Promise<boolean> {
    return `${plain}-hashed` === hashed;
  }
}
