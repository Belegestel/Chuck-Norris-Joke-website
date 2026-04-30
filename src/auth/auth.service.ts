import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, password: string): Promise<Any> {
    const user = await this.usersService.findOne(email);
    if(user?.password !== password) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user; 
    return result;
  }
}
