import { Strategy } from '@splitpierre/passport-cardano';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class CardanoStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(user: any): Promise<any> {
    console.log('validate?');
    const grabUser = await this.authService.verify(user);
    if (!grabUser) {
      console.log('unauthorized!');
      throw new UnauthorizedException();
    }
    return grabUser;
  }
}
