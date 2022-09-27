import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: User) {
    const createdUser = await this.prisma.user.create({ data: data });
    const roles = await this.prisma.userRole.findFirst({
      where: {
        name: {
          equals: 'Voter',
        },
      },
    });
    const updateUser = await this.prisma.user.update({
      where: {
        id: String(createdUser.id),
      },
      data: {
        roles: {
          connect: { id: String(roles.id) },
        },
      },
    });
    return updateUser;
  }

  genApiKey(id: string, apiKey: string) {
    return this.prisma.user.update({
      where: {
        id: String(id),
      },
      data: {
        apiKey: apiKey,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: String(id),
      },
    });
  }

  update(id: string, data: User) {
    return this.prisma.user.update({
      where: {
        id: String(id),
      },
      data: data,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id: String(id),
      },
    });
  }
}
