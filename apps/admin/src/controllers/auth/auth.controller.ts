import { Response } from 'express';
import { Controller, Post, Res, Body, SetMetadata } from '@nestjs/common';

import { AuthService } from '@app/modules/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SetMetadata('isPublic', true)
  @Post('signin')
  async SignIn(
    @Body()
    {
      password,
      username,
    }: {
      password: string;
      username: string;
    },
    @Res() res: Response,
  ) {
    const { user, token } = await this.authService.signIn({
      password,
      username,
    });
    res.cookie('token', token, {
      httpOnly: true,
    });
    res.json({ user });
  }
}
