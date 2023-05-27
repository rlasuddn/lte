import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthsModule } from 'src/auths/auths.module';

@Module({
  imports: [AuthsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
