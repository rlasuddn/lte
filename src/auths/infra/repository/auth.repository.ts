import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthUser } from 'src/auths/domain/auth-user';
import { IAuthRepository } from 'src/auths/domain/iauth.repository';

@Injectable()
export class AuthsRepository implements IAuthRepository {
  async findUser(email: string): Promise<AuthUser> {
    //TODO: email에 해당하는 유저 찾는 로직
    const data = {
      email: 'root123@naver.com',
      nickname: 'root',
      password: '$2b$10$2HtnabzzK.Z7KdYqws0rfe/dlpDdZA5qH9lKNF9hlbtIZ6sIKl6ye',
    };
    const user = plainToClass(AuthUser, data);
    return user;
  }

  async singup(authUser: AuthUser) {
    console.log(authUser);
    //TODO: 인증 유저 생성 로직
    return;
  }
}
