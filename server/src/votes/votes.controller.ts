import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Votes } from '@prisma/client';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  create(@Body() data: Votes) {
    return this.votesService.create(data);
  }

  @Get()
  findAll() {
    return this.votesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Votes) {
    return this.votesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votesService.remove(id);
  }
}
