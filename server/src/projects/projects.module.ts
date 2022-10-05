import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService, UsersService],
})
export class ProjectsModule {}
