import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async verify(user: any) {
    console.log('verifying user', { user });
    const grabUser = await this.userService.findOneByAddress(user);
    console.log('authService verify user', grabUser);
    return null;
  }
}
