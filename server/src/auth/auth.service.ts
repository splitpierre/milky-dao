import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { SignedData } from './cardano-auth-helper';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async verify(address: string, signature: any) {
    const user = await this.userService.findOneByAddress(address);
    const payload: any = signature;
    const signature_obj = new SignedData(payload);
    if (!signature_obj.verify(address, user.nonce)) {
      return null;
    }
    return true;
  }

  async login(user: User) {
    console.log('do login', user);
    const payload = { address: user.address, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
