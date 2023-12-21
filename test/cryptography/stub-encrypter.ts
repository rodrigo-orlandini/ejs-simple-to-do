import { Encrypter } from 'src/domain/cryptography/encrypter';

export class StubEncrypter implements Encrypter {
  public async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
