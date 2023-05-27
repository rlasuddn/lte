import { AuthDto } from '../interface/dtos/auth.dto';
import { AuthUser } from './auth-user';

export interface IAuthRepository {
  findUser: (email: string) => Promise<AuthUser>;
  singup: (authUser: AuthDto) => Promise<void>;
}
