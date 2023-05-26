import { Module } from '@nestjs/common';
import { AuthsService } from './application/auths.service';
import { AuthsController } from './interface/auths.controller';

@Module({
  controllers: [AuthsController],
  providers: [AuthsService],
})
export class AuthsModule {}
