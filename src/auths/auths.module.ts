import { Module } from '@nestjs/common';
import { AuthsService } from './application/auths.service';
import { AuthsController } from './interface/auths.controller';
import { AuthsRepository } from './infra/repository/auth.repository';

@Module({
  controllers: [AuthsController],
  providers: [
    AuthsService,
    { provide: 'AuthRepository', useClass: AuthsRepository },
  ],
  exports: [AuthsService],
})
export class AuthsModule {}
