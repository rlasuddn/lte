import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthsService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requset = context.switchToHttp().getRequest();
    return this.validateRequest(requset);
  }

  private validateRequest(request: Request) {
    try {
      const token = request.headers.authorization.split('Bearer ')[1];
      this.authService.verify(token);
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}
