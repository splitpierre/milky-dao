import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import generateApiKey from 'generate-api-key';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { generateNonce } from 'src/auth/auth.util';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AuthGuard } from 'src/auth/auth.guard';
import { rolesBuilder } from 'src/app.roles';
import { CreateUserDto } from './dto/create-user.dto';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'create',
  })
  @Post()
  @ApiOperation({ summary: 'Creates a new user with default nonce.' })
  create(@Body() data: CreateUserDto) {
    const newNonce = generateNonce();
    data.nonce = newNonce;
    return this.usersService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('apiKey/:id')
  @ApiOperation({ summary: 'Generates user API key and adds developer role.' })
  genApiKey(@Param('id') id: string) {
    const apiKey = generateApiKey({
      method: 'uuidv5',
      name: 'milky-dao',
      batch: 1,
    });
    return this.usersService.genApiKey(id, apiKey[0]);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Get user by it's ID" })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'own',
  })
  @Patch(':id')
  @ApiOperation({ summary: 'Updates user by ID' })
  async update(@Req() req, @Param('id') id: string, @Body() data: User) {
    // return this.usersService.update(id, data);
    const user = req.user;
    // admin
    if (rolesBuilder.can(user.roles).updateAny('users').granted) {
      return this.usersService.update(id, data);
    }

    const theUser = await this.usersService.findOne(id);

    const allowedFields = rolesBuilder
      .can(user.roles)
      .updateOwn('users').attributes;
    const usedFields = Object.keys(data);

    if (
      rolesBuilder.can(user.roles).updateOwn('users').granted &&
      user.userId === theUser.id
    ) {
      if (
        usedFields.filter((obj) => !allowedFields.includes(obj)).length === 0 ||
        allowedFields.includes('*')
      ) {
        return this.usersService.update(id, data);
      } else {
        throw new ForbiddenException('You cant edit this field');
      }
    } else {
      throw new ForbiddenException("You don't own this User");
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'delete',
    possession: 'own',
  })
  @Delete(':id')
  @ApiOperation({ summary: "Permanently delete a user by it's ID" })
  async remove(@Req() req, @Param('id') id: string) {
    const user = req.user;
    const theUser = await this.usersService.findOne(id);
    if (rolesBuilder.can(user.roles).deleteAny('users').granted) {
      return this.usersService.remove(id);
    }
    if (
      rolesBuilder.can(user.roles).deleteOwn('proposals').granted &&
      user.userId === theUser.id
    ) {
      return this.usersService.remove(id);
    } else {
      throw new ForbiddenException("You don't own this User");
    }
  }
}
