import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { CardanoStrategy } from './strategies/cardano.strategy';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    CardanoStrategy,
    LocalStrategy,
    UsersService,
    PrismaService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
