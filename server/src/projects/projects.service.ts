import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

// TODO: Guard endpoints for specific roles
@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}
  create(data: Project) {
    return this.prisma.project.create({ data });
  }
  async countProjectVotes(id: string) {
    const proposals = await this.prisma.proposal.findMany({
      where: {
        projectId: String(id),
      },
      include: {
        votes: true,
      },
    });
    let votes_count = 0;
    for (const proposal of proposals) {
      votes_count += proposal.votes.length;
    }
    return votes_count;
  }
  async findAll() {
    const projects = await this.prisma.project.findMany({
      include: {
        categories: true,
        proposals: {
          include: {
            votes: true,
          },
        },
      },
    });
    for (const project of projects) {
      project['votes_count'] = await this.countProjectVotes(project.id);
    }
    return projects;
  }

  findOne(id: string) {
    return this.prisma.project.findUnique({
      where: {
        id: String(id),
      },
      include: {
        categories: true,
        proposals: {
          include: {
            votes: true,
          },
        },
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

  async remove(id: string) {
    const grab_project = await this.prisma.project.findUnique({
      where: {
        id: String(id),
      },
      include: {
        categories: true,
      },
    });
    const categories = grab_project.categories;
    for (const cat of categories) {
      await this.prisma.category.update({
        where: {
          id: String(cat.id),
        },
        data: {
          projects: {
            disconnect: { id: String(id) },
          },
        },
      });
    }
    return this.prisma.project.delete({
      where: {
        id: String(id),
      },
    });
  }
}
