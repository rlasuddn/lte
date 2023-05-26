import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthsService } from '../application/auths.service';

import * as bcrypt from 'bcrypt';
import { ResponseEntity } from 'src/common/response/response.entity';
import { AuthDto } from './dtos/auth.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    const existUser = await this.authsService.findUser(dto.email);

    const comparePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );

    if (!comparePassword)
      throw new HttpException(
        '로그인 정보를 확인해 주세요.',
        HttpStatus.NOT_FOUND,
      );

    //토큰 발급
    return await this.authsService.signin(existUser.email, existUser.nickname);
  }

  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    //TODO: 데이터 베이스에서 이메일에 해당하는 유저 조회
    const existUser = await this.authsService.findUser(dto.email);

    if (existUser)
      throw new HttpException('이미 가입된 이메일입니다.', HttpStatus.CONFLICT);

    const salt = await bcrypt.genSalt();

    const bcryptPassword = await bcrypt.hash(dto.password, salt);

    //TODO: 이메일, 비밀번호
    await this.authsService.createUser(dto.email, bcryptPassword, dto.nickname);

    return ResponseEntity.Ok(HttpStatus.OK, '회원가입에 성공하였습니다.');
  }

  @Delete()
  async deleteUser(@Param() email: string) {
    await this.authsService.deleteUser(email);
  }
}
