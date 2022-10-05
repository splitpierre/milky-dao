import { Module } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { ProposalsController } from './proposals.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ProposalsController],
  providers: [ProposalsService, PrismaService, UsersService],
})
export class ProposalsModule {}
