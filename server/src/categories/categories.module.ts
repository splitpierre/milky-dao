import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, UsersService],
})
export class CategoriesModule {}
