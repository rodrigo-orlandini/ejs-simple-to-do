import { Controller, Get, Render } from '@nestjs/common';

@Controller('/sign-up')
export class SignUpPageController {
  @Get()
  @Render('sign-up')
  root() {
    return;
  }
}
