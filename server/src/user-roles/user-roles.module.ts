import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [UserRolesController],
  providers: [UserRolesService, PrismaService, UsersService],
})
export class UserRolesModule {}
