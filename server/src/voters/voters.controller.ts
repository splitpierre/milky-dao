import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VotersService } from './voters.service';
import { Voter } from '@prisma/client';

@Controller('voters')
export class VotersController {
  constructor(private readonly votersService: VotersService) {}

  @Post()
  create(@Body() createVoterDto: Voter) {
    return this.votersService.create(createVoterDto);
  }

  @Get()
  findAll() {
    return this.votersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoterDto: Voter) {
    return this.votersService.update(+id, updateVoterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votersService.remove(+id);
  }
}
