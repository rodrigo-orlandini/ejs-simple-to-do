import { Controller, Get, Render } from '@nestjs/common';

import { Public } from 'src/infrastructure/cryptography/public';

@Controller('/')
export class AuthController {
  @Public()
  @Get()
  @Render('auth')
  root() {
    return;
  }
}
