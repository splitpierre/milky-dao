import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import generateApiKey from 'generate-api-key';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: User) {
    return this.usersService.create(data);
  }

  @Get('apiKey/:id')
  genApiKey(@Param('id') id: string) {
    const apiKey = generateApiKey({
      method: 'uuidv5',
      name: 'milky-dao',
      batch: 1,
    });
    return this.usersService.genApiKey(id, apiKey[0]);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: User) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
