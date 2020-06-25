import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@app/entities';
import { errors } from '@app/utils';

import { UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly usersService: UsersService,
  ) {}

  comparePassword({
    origin,
    target,
  }: {
    origin: string;
    target: string;
  }): Promise<boolean> {
    return bcrypt.compare(target, origin);
  }

  async signIn({
    password,
    username,
  }: {
    password: string;
    username: string;
  }): Promise<{ token: string; user: User }> {
    const user = await this.usersService.findOne({ username });
    if (!user) {
      throw errors.UNAUTHORIZED_ERROR('사용자를 찾을 수 없습니다.');
    }

    if (!user.password) {
      throw errors.BAD_REQUEST_ERROR('사용자 비밀번호를 설정해주세요.');
    }

    if (
      !(await this.comparePassword({ origin: user.password, target: password }))
    ) {
      throw errors.UNAUTHORIZED_ERROR('비밀번호가 틀렸습니다.');
    }

    delete user.password;
    const token = this.jwt.sign(JSON.stringify(user));
    return { token, user };
  }
}
