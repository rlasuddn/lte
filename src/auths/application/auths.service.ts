import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { AuthDto } from '../interface/dtos/auth.dto';
import { IAuthRepository } from '../domain/iauth.repository';
import { plainToClass } from 'class-transformer';
import { AuthUser } from '../domain/auth-user';
import { ResponseEntity } from 'src/common/response/response.entity';

@Injectable()
export class AuthsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('AuthRepository') private readonly authRepository: IAuthRepository,
  ) {}

  async signin(dto: AuthDto) {
    const existUser = await this.authRepository.findUser(dto.email);

    const comparePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );

    if (!comparePassword)
      throw new HttpException(
        '로그인 정보를 확인해 주세요.',
        HttpStatus.NOT_FOUND,
      );

    const payload = { email: existUser.email, nickname: existUser.nickname };

    return jwt.sign(payload, this.configService.get('JWT_SECRET'), {
      expiresIn: '1d',
      audience: 'example.com',
      issuer: 'example.com',
    });
  }

  async signup(dto: AuthDto) {
    const existUser = await this.authRepository.findUser(dto.email);

    if (existUser)
      throw new HttpException('이미 가입된 이메일입니다.', HttpStatus.CONFLICT);

    const salt = await bcrypt.genSalt();

    const bcryptPassword = await bcrypt.hash(dto.password, salt);

    const signupUser = plainToClass(AuthUser, {
      email: dto.email,
      nickname: dto.nickname,
      password: bcryptPassword,
    });

    await this.authRepository.singup(signupUser);

    return ResponseEntity.Ok(HttpStatus.OK, '회원가입에 성공하였습니다.');
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
}
