import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  create(data: Category) {
    return this.prisma.category.create({
      data: data,
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      include: {
        projects: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({
      where: {
        id: String(id),
      },
      include: {
        projects: true,
      },
    });
  }

  update(id: string, data: Category) {
    return this.prisma.category.update({
      where: {
        id: String(id),
      },
      data: data,
    });
  }

  async remove(id: string) {
    const grab_category = await this.prisma.category.findUnique({
      where: {
        id: String(id),
      },
      include: {
        projects: true,
      },
    });
    const projects = grab_category.projects;
    for (const project of projects) {
      await this.prisma.project.update({
        where: {
          id: String(project.id),
        },
        data: {
          categories: {
            disconnect: { id: String(id) },
          },
        },
      });
    }
    return this.prisma.category.delete({
      where: {
        id: String(id),
      },
    });
  }
}
