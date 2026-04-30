import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UsersService {
  private users = [];

  constructor() { this.setupTestUser(); }

  private async setupTestUser() {
    const hashedPwd = await bcrypt.hash('password', 10);
    this.users.push({ userId: 1, email: 'test@example.com', password: hashedPwd });
  }

  async findOne(email: string): Promise<User | undefined>{
    return this.users.find(user => user.email === email);
  }
}
