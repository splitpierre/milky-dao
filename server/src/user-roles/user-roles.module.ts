import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserRolesController],
  providers: [UserRolesService, PrismaService],
})
export class UserRolesModule {}
