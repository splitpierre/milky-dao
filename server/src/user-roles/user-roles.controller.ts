import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from '@prisma/client';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post()
  create(@Body() data: UserRole) {
    return this.userRolesService.create(data);
  }

  @Get()
  findAll() {
    return this.userRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UserRole) {
    return this.userRolesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRolesService.remove(id);
  }
}
