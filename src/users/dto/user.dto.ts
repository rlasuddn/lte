import { IsEmail, IsString, Max, MaxLength } from 'class-validator';

export class UserDto {
  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @IsString()
  @MaxLength(20)
  readonly password: string;

  @IsString()
  @MaxLength(15)
  readonly nickname: string;
}
