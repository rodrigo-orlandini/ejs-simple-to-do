import { Controller, Get, Render } from '@nestjs/common';

@Controller('/')
export class AuthPageController {
  @Get()
  @Render('auth')
  root() {
    return;
  }
}
