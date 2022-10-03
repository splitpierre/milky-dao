import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { Proposal } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Post()
  create(@Body() data: Proposal) {
    return this.proposalsService.create(data);
  }

  @Get()
  findAll() {
    return this.proposalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proposalsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Proposal) {
    return this.proposalsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proposalsService.remove(id);
  }
}
