import { Module } from '@nestjs/common';
import { VotersService } from './voters.service';
import { VotersController } from './voters.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VotersController],
  providers: [VotersService, PrismaService],
})
export class VotersModule {}
