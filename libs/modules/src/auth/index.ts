import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/entities';
import { AuthService } from './auth.service';
import { UsersService } from '../users';

export { AuthService };

@Module({
  imports: [
    JwtModule.register({
      secret: 'test',
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
