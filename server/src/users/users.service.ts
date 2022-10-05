import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
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

  async genApiKey(id: string, apiKey: string) {
    const roles = await this.prisma.userRole.findFirst({
      where: {
        name: {
          equals: 'Developer',
        },
      },
    });
    return this.prisma.user.update({
      where: {
        id: String(id),
      },
      data: {
        apiKey: apiKey,
        roles: {
          connect: { id: String(roles.id) },
        },
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        roles: true,
      },
    });
  }

  findOneByAddress(address: string) {
    return this.prisma.user.findUnique({
      where: {
        address: String(address),
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: String(id),
      },
      include: {
        roles: true,
        proposal: true,
        project: true,
      },
    });
  }

  update(id: string, data: any) {
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
