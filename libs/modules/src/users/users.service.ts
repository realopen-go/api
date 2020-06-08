import { Repository, FindConditions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@app/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOne({ id = '', username = '' }): Promise<User> {
    const where: FindConditions<User> = {};

    if (id) {
      where.id = id;
    }
    if (username) {
      where.username = username;
    }

    return this.userRepository.findOne({
      where,
    });
  }
}
