import { Injectable } from '@nestjs/common';
import { Proposal } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';

@Injectable()
export class ProposalsService {
  constructor(private prisma: PrismaService) {}
  create(data: Proposal) {
    return this.prisma.proposal.create({ data });
  }

  findAll() {
    return this.prisma.proposal.findMany({
      include: {
        project: true,
        user: true,
        votes: true,
      },
    });
  }

  findOwn(userId: string) {
    return this.prisma.proposal.findMany({
      where: {
        userId: String(userId),
      },
      include: {
        project: true,
        user: true,
        votes: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.proposal.findUnique({
      where: {
        id: String(id),
      },
      include: {
        project: true,
        user: true,
        votes: true,
      },
    });
  }

  update(id: string, data: Proposal) {
    return this.prisma.proposal.update({
      where: {
        id: String(id),
      },
      data: data,
    });
  }

  remove(id: string) {
    return this.prisma.proposal.delete({
      where: {
        id: String(id),
      },
    });
  }
}
