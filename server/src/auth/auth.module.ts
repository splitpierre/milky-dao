import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { CardanoStrategy } from './strategies/cardano.strategy';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [
    AuthService,
    CardanoStrategy,
    LocalStrategy,
    UsersService,
    PrismaService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
