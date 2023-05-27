import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AuthsService } from '../application/auths.service';

import { AuthDto } from './dtos/auth.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    return await this.authsService.signin(dto);
  }

  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return await this.authsService.signup(dto);
  }

  @Delete()
  async deleteUser(@Param() email: string) {
    //TODO: 회원탈퇴
  }
}
