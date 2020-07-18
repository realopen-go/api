import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Bill } from '@app/entities';

import { AuthService } from './auth.service';
import { JWT_SECRET } from '../global-auth/constants';
import { UsersService } from '../users';

export { AuthService };

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    TypeOrmModule.forFeature([Bill, User]),
  ],
  providers: [AuthService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
