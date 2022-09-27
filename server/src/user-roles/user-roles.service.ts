import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

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
        id: String(id),
      },
    });
  }

  update(id: string, data: UserRole) {
    return this.prisma.userRole.update({
      where: {
        id: String(id),
      },
      data: data,
    });
  }

  remove(id: string) {
    // TODO: Disconnect user roles
    return this.prisma.userRole.delete({
      where: {
        id: String(id),
      },
    });
  }
}
