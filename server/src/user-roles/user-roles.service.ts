import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class UserRolesService {
  constructor(private prisma: PrismaService) {}

  create(data: UserRole) {
    return this.prisma.userRole.create({ data });
  }

  findAll() {
    return this.prisma.userRole.findMany();
  }

  findOne(id: string) {
    return this.prisma.userRole.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, data: UserRole) {
    return this.prisma.userRole.update({ where: { id: id }, data: data });
  }

  remove(id: string) {
    return this.prisma.userRole.delete({ where: { id: id } });
  }

  customCount(param: string) {
    return this.prisma.userRole.count({
      where: {
        name: {
          contains: param,
        },
      },
    });
  }
}
