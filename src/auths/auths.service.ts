import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthsService {
  constructor() {}

  async findUser(email: string) {
    return true;
  }

  async createUser(email: string, password: string, salt: string) {
    console.log({ email, password, salt });
    return true;
  }
}
