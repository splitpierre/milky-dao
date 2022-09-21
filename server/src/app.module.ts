import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { VotersModule } from './voters/voters.module';

@Module({
  imports: [VotersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
