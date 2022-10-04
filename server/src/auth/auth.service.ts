import { BadRequestException, Injectable } from '@nestjs/common';
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

  async verify(address: string, signature: any, nonce: string) {
    const user = await this.userService.findOneByAddress(address);
    if (!address || !signature) {
      throw new BadRequestException('Message is missing fields.');
    }
    // let nonce: any = '';
    if (!user) {
      if (!nonce) throw new BadRequestException('Message is missing fields.');
      nonce = nonce;
    } else {
      nonce = user.nonce;
    }
    const payload: any = signature;
    const signature_obj = new SignedData(payload);
    console.log('will verify', signature_obj);
    if (!signature_obj.verify(address, nonce)) {
      console.log('did not verify');
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
