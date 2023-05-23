import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @IsString()
  @MaxLength(20)
  readonly password: string;
}
