import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { Hasher } from 'src/domain/cryptography/hasher';
import { Encrypter } from 'src/domain/cryptography/encrypter';

import { BcryptHasher } from './bcrypt-hasher';
import { JwtEncrypter } from './jwt-encrypter';

import { AuthGuard } from './auth.guard';

@Module({
  providers: [
    { provide: Hasher, useClass: BcryptHasher },
    { provide: Encrypter, useClass: JwtEncrypter },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [Hasher, Encrypter],
})
export class CryptographyModule {}
