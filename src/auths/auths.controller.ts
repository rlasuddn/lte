import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { ResponseEntity } from 'src/common/response/response.entity';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('signin')
  async signin() {
    return true;
  }

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    //TODO: 데이터 베이스에서 이메일에 해당하는 유저 조회
    const existUser = await this.authsService.findUser(dto.email);

    if (existUser)
      throw new HttpException('이미 가입된 이메일입니다.', HttpStatus.CONFLICT);

    const salt = await bcrypt.genSalt();

    const bcryptPassword = await bcrypt.hash(dto.password, salt);

    //TODO: 이메일, 비밀번호, 솔트값 저장
    await this.authsService.createUser(dto.email, bcryptPassword, salt);

    return ResponseEntity.Ok(HttpStatus.OK, '회원가입에 성공하였습니다.');
  }
}
