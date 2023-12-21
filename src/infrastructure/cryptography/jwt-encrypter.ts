import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Encrypter } from 'src/domain/cryptography/encrypter';

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwt: JwtService) {}

  public async encrypt(payload: Record<string, unknown>): Promise<string> {
    return await this.jwt.signAsync(payload);
  }
}
