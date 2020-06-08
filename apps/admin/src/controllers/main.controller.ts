import { Response } from 'express';
import { Controller, Get, Res, SetMetadata } from '@nestjs/common';

@Controller()
export class MainController {
  @SetMetadata('isPublic', true)
  @Get('/')
  HealthCheck(@Res() res: Response) {
    res.sendStatus(200);
  }
}
