export class AuthUser {
  constructor(
    readonly email: string,
    readonly nickname: string,
    readonly password: string,
  ) {}
}
