import { Strategy } from '@splitpierre/passport-cardano';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CardanoStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {
    super();
  }

  async validate(address: string, signature: any, nonce: string): Promise<any> {
    const user = await this.userService.findOneByAddress(address);
    if (!user) {
      throw new NotFoundException();
    }
    console.log('lets verify', { address, signature, nonce });
    const verify = await this.authService.verify(address, signature, nonce);
    if (!verify) {
      throw new UnauthorizedException('Signed message does not verify');
    }
    return user;
  }
}
