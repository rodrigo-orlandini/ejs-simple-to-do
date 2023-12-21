import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { Hasher } from 'src/domain/cryptography/hasher';
import { Encrypter } from 'src/domain/cryptography/encrypter';

import { BcryptHasher } from './bcrypt-hasher';
import { JwtEncrypter } from './jwt-encrypter';

import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';

import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      global: true,
      useFactory(environment: EnvironmentService) {
        return {
          signOptions: { expiresIn: '1d' },
          secret: environment.get('JWT_SECRET'),
        };
      },
    }),
  ],
  providers: [
    EnvironmentService,
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
