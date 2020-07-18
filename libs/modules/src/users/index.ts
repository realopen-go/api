import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Bill, User } from '@app/entities';

export { UsersService };

@Module({
  imports: [TypeOrmModule.forFeature([Bill, User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
