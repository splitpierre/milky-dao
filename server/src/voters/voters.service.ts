import { Injectable } from '@nestjs/common';
import { Voter } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VotersService {
  constructor(private prisma: PrismaService) {}

  create(data: Voter) {
    return this.prisma.voter.create({ data });
  }

  findAll() {
    return this.prisma.voter.findMany();
  }

  findOne(id: number) {
    return this.prisma.voter.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  update(id: number, data: Voter) {
    return this.prisma.voter.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
  }

  remove(id: number) {
    return this.prisma.voter.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
