import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Votes } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { rolesBuilder } from '../app.roles';

@ApiTags('Voting')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'votes',
    action: 'create',
    possession: 'own',
  })
  @ApiOperation({ summary: 'Create new vote' })
  @Post()
  create(@Req() req, @Body() data: Votes) {
    const user = req.user;
    data.userId = user.userId;
    return this.votesService.create(data);
  }

  @ApiOperation({ summary: 'Get all votes' })
  @Get('all')
  findAll() {
    return this.votesService.findAll();
  }

  @ApiOperation({ summary: 'Get own votes' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'votes',
    action: 'read',
  })
  @Get('own')
  findOwn(@Req() req) {
    return this.votesService.findOwn(req.user.userId);
  }

  @ApiOperation({ summary: 'Get vote by ID' })
  @Get('vote/:id')
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'votes',
    action: 'update',
    possession: 'own',
  })
  @ApiOperation({ summary: 'Update vote by ID' })
  @Patch('vote/:id')
  async update(@Req() req, @Param('id') id: string, @Body() data: Votes) {
    const user = req.user;
    // return this.votesService.update(id, data);
    // admin
    if (rolesBuilder.can(user.roles).updateAny('votes').granted) {
      return this.votesService.update(id, data);
    }

    const vote = await this.votesService.findOne(id);
    if (
      rolesBuilder.can(user.roles).updateOwn('proposals').granted &&
      user.userId === vote.userId
    ) {
      return this.votesService.update(id, data);
    } else {
      throw new ForbiddenException("You don't own this Vote");
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'votes',
    action: 'delete',
    possession: 'own',
  })
  @ApiOperation({ summary: 'Delete vote by ID' })
  @Delete('vote/:id')
  async remove(@Req() req, @Param('id') id: string) {
    // return this.votesService.remove(id);
    const user = req.user;
    // admin
    if (rolesBuilder.can(user.roles).deleteAny('votes').granted) {
      return this.votesService.remove(id);
    }

    const vote = await this.votesService.findOne(id);
    if (
      rolesBuilder.can(user.roles).deleteOwn('votes').granted &&
      user.userId === vote.userId
    ) {
      return this.votesService.remove(id);
    } else {
      throw new ForbiddenException("You don't own this Vote");
    }
  }
}
