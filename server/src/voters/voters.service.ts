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

  findOne(id: string) {
    return this.prisma.voter.findUnique({
      where: {
        id: String(id),
      },
    });
  }

  update(id: string, data: Voter) {
    return this.prisma.voter.update({
      where: {
        id: String(id),
      },
      data: data,
    });
  }

  remove(id: string) {
    return this.prisma.voter.delete({
      where: {
        id: String(id),
      },
    });
  }
}
