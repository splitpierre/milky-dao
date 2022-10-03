import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { generateNonce } from './auth.util';
import { CardanoAuthGuard } from './guards/cardano-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(CardanoAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Pass address and a signed nonce to login' })
  @ApiBody({
    type: 'string',
  })
  async login(@Request() req) {
    await this.userService.update(req.user.id, { nonce: generateNonce() });
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registers a new user.' })
  @ApiBody({
    type: 'string',
  })
  async register(@Request() req) {
    const user = await this.userService.findOneByAddress(req.body.address);
    if (user) {
      throw new UnauthorizedException('User already exists, try login!');
    }
    const verify = await this.authService.verify(
      req.body.address,
      req.body.signature,
    );
    if (verify) {
      const newUser = {
        address: req.body.address,
        nonce: generateNonce(),
      };
      const user = await this.userService.create(newUser);
      return user;
    } else {
      throw new UnauthorizedException('Signed message does not verify.');
    }
  }

  @Get('nonce')
  @ApiOperation({ summary: "Get's new/current nonce for new/existing users" })
  async nonce(@Request() req?: any) {
    const address = req.query.address || req.body.address;
    if (address) {
      const user = await this.userService.findOneByAddress(address);
      if (!user) {
        throw new NotFoundException();
      } else {
        return user.nonce;
      }
    }
    return generateNonce();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  getProfile(@Request() req) {
    console.log('endpoint req');
    const user = this.userService.findOne(req.user.userId);
    return user;
  }
}
