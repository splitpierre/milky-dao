import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Query,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { generateNonce } from './auth.util';
import { CardanoAuthGuard } from './guards/cardano-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(CardanoAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log('will login endpoint');
    return this.authService.login(req.user);
  }

  @Get('nonce')
  async nonce(@Request() req?: any) {
    console.log('prep req', {
      q: req.query.address,
      b: req.body.address,
    });
    const address = req.query.address || req.body.address;
    if (address) {
      const user = await this.userService.findOneByAddress(address);
      if (!user) {
        throw new NotFoundException();
      } else {
        return user.nonce;
      }
    }
    console.log('gen nonce for address', req.query.address);
    return generateNonce();
  }

  @Post('register')
  async register(@Request() req) {
    console.log('will log', req);
    return this.userService.create(req.body);
  }
}
