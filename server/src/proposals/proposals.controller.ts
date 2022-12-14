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
import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { Proposal } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { rolesBuilder } from '../app.roles';
@ApiTags('Proposals')
@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @ApiOperation({ summary: 'Create new proposal' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'proposals',
    action: 'create',
    possession: 'own',
  })
  @Post()
  create(@Body() data: CreateProposalDto) {
    return this.proposalsService.create(data);
  }

  @ApiOperation({ summary: 'Get all proposals' })
  @Get('all')
  findAll() {
    return this.proposalsService.findAll();
  }

  @ApiOperation({ summary: 'Get own proposals' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'proposals',
    action: 'read',
  })
  @Get('own')
  findOwn(@Req() req) {
    return this.proposalsService.findOwn(req.user.userId);
  }

  @ApiOperation({ summary: 'Get proposal by ID' })
  @Get('proposal/:id')
  findOne(@Param('id') id: string) {
    return this.proposalsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update proposal by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'proposals',
    action: 'update',
    possession: 'own',
  })
  @Patch('proposal/:id')
  async update(@Req() req, @Param('id') id: string, @Body() data: Proposal) {
    const user = req.user;

    // admin
    if (rolesBuilder.can(user.roles).updateAny('proposals').granted) {
      return this.proposalsService.update(id, data);
    }

    const proposal = await this.proposalsService.findOne(id);

    const allowedFields = rolesBuilder
      .can(user.roles)
      .updateOwn('proposals').attributes;
    const usedFields = Object.keys(data);

    console.log(
      'dev',
      rolesBuilder.can(user.roles).updateOwn('proposals').attributes,
    );
    if (
      rolesBuilder.can(user.roles).updateOwn('proposals').granted &&
      user.userId === proposal.userId
    ) {
      if (
        usedFields.filter((obj) => !allowedFields.includes(obj)).length === 0 ||
        allowedFields.includes('*')
      ) {
        return this.proposalsService.update(id, data);
      } else {
        throw new ForbiddenException('You cant edit this field');
      }
    } else {
      throw new ForbiddenException("You don't own this Proposal");
    }
  }

  @ApiOperation({ summary: 'Delete proposal by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'proposals',
    action: 'delete',
    possession: 'own',
  })
  @Delete('proposal/:id')
  async remove(@Req() req, @Param('id') id: string) {
    const user = req.user;
    // admin
    if (rolesBuilder.can(user.roles).deleteAny('proposals').granted) {
      return this.proposalsService.remove(id);
    }

    const proposal = await this.proposalsService.findOne(id);
    if (
      rolesBuilder.can(user.roles).deleteOwn('proposals').granted &&
      user.userId === proposal.userId
    ) {
      return this.proposalsService.remove(id);
    } else {
      throw new ForbiddenException("You don't own this Proposal");
    }
  }
}
