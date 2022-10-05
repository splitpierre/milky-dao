import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Users')
@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'user-roles',
    action: 'create',
  })
  @ApiOperation({ summary: 'Create new user role' })
  @Post()
  create(@Body() data: UserRole) {
    return this.userRolesService.create(data);
  }

  @ApiOperation({ summary: 'Get all user roles' })
  @Get()
  findAll() {
    return this.userRolesService.findAll();
  }

  @ApiOperation({ summary: 'Get user role by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRolesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'user-roles',
    action: 'update',
  })
  @ApiOperation({ summary: 'update user role by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UserRole) {
    return this.userRolesService.update(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'user-roles',
    action: 'delete',
  })
  @ApiOperation({ summary: 'Delete user role by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRolesService.remove(id);
  }
}
