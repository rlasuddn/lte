import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthsService {
  constructor(private readonly configService: ConfigService) {}

  async findUser(email: string) {
    return {
      email: 'root123@naver.com',
      password: '$2b$10$2HtnabzzK.Z7KdYqws0rfe/dlpDdZA5qH9lKNF9hlbtIZ6sIKl6ye',
      nickname: 'root',
    };
  }

  async createUser(email: string, password: string, nickname: string) {
    console.log({ email, password, nickname });
    return true;
  }

  async signin(email: string, nickname: string) {
    const payload = { email, nickname };

    return jwt.sign(payload, this.configService.get('JWT_SECRET'), {
      expiresIn: '1d',
      audience: 'example.com',
      issuer: 'example.com',
    });
  }

  verify(jwtString: string) {
    try {
      const payload = jwt.verify(
        jwtString,
        this.configService.get('JWT_SECRET'),
      ) as (jwt.JwtPayload | string) & { email: string; nickname: string };

      const { email, nickname } = payload;
      return { email, nickname };
    } catch (err) {
      console.log(err);
      throw new HttpException('토큰 이상 감지', HttpStatus.FORBIDDEN);
    }
  }

  async deleteUser(email: string) {
    return true;
  }
}
