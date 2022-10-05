import { Injectable } from '@nestjs/common';
import { Votes } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}
  create(data: Votes) {
    return this.prisma.votes.create({
      data,
    });
  }

  findAll() {
    return this.prisma.votes.findMany({
      include: {
        user: true,
        proposal: true,
      },
    });
  }

  findOwn(userId: string) {
    return this.prisma.votes.findMany({
      where: {
        userId: String(userId),
      },
      include: {
        user: true,
        proposal: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.votes.findUnique({
      where: {
        id: String(id),
      },
      include: {
        user: true,
        proposal: true,
      },
    });
  }

  update(id: string, data: Votes) {
    return this.prisma.votes.update({
      where: {
        id: String(id),
      },
      data: data,
    });
  }

  remove(id: string) {
    return this.prisma.votes.delete({
      where: {
        id: String(id),
      },
    });
  }
}
