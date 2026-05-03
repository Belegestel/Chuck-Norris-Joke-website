import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);

    if(!user) { throw new ConflictException('User not found'); }

    const isPwdMatch = await bcrypt.compare(password, user.password);

    if(!isPwdMatch) {
      throw new ConflictException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async signUp(email: string, password: string): Promise<any> {
    const isAlreadyRegistered = await this.usersService.findOne(email);
    if(isAlreadyRegistered) {
      throw new ConflictException('User already exists');
    }

    const user = await this.usersService.create(email, password);
    const { password: _, ...result } = user;
    return result;
  }
}
