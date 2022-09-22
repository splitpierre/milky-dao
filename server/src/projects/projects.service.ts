import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}
  create(data: Project) {
    return this.prisma.project.create({ data });
  }

  findAll() {
    return this.prisma.project.findMany();
  }

  findOne(id: string) {
    return this.prisma.project.findUnique({
      where: {
        id: String(id),
      },
    });
  }

  update(id: string, data: Project) {
    return this.prisma.project.update({
      where: {
        id: String(id),
      },
      data: data,
    });
  }

  remove(id: string) {
    return this.prisma.project.delete({
      where: {
        id: String(id),
      },
    });
  }
}
