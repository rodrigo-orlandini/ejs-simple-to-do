import { Controller, Get, Render } from '@nestjs/common';

@Controller('/')
export class AuthController {
  @Get()
  @Render('auth')
  root() {
    return;
  }
}
