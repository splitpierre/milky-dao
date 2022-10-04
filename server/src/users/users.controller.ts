import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import generateApiKey from 'generate-api-key';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { generateNonce } from 'src/auth/auth.util';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new user with default nonce.' })
  create(@Body() data: User) {
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

  @Patch(':id')
  @ApiOperation({ summary: 'Updates user by ID' })
  update(@Param('id') id: string, @Body() data: User) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Permanently delete a user by it's ID" })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
