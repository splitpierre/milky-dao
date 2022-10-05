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
import { ProjectsService } from './projects.service';
import { Project } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { rolesBuilder } from 'src/app.roles';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'projects',
    action: 'create',
  })
  @Post()
  create(@Body() data: Project) {
    return this.projectsService.create(data);
  }

  @Get('all')
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'projects',
    action: 'read',
  })
  @Get('own')
  findOwn(@Req() req) {
    return this.projectsService.findOwn(req.user.userId);
  }

  @Get('project/:id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Get('count_votes/:id')
  countProjectVotes(@Param('id') id: string) {
    return this.projectsService.countProjectVotes(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'projects',
    action: 'update',
    possession: 'own',
  })
  @Patch('project/:id')
  async update(@Req() req, @Param('id') id: string, @Body() data: Project) {
    const user = req.user;
    // admin
    if (rolesBuilder.can(user.roles).updateAny('projects').granted) {
      return this.projectsService.update(id, data);
    }

    const proposal = await this.projectsService.findOne(id);

    const allowedFields = rolesBuilder
      .can(user.roles)
      .updateOwn('projects').attributes;
    const usedFields = Object.keys(data);

    if (
      rolesBuilder.can(user.roles).updateOwn('projects').granted &&
      user.userId === proposal.userId
    ) {
      if (
        usedFields.filter((obj) => !allowedFields.includes(obj)).length === 0 ||
        allowedFields.includes('*')
      ) {
        return this.projectsService.update(id, data);
      } else {
        throw new ForbiddenException('You cant edit this field');
      }
    } else {
      throw new ForbiddenException("You don't own this Project");
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'projects',
    action: 'delete',
    possession: 'own',
  })
  @Delete('project/:id')
  async remove(@Req() req, @Param('id') id: string) {
    const user = req.user;
    const project = await this.projectsService.findOne(id);
    if (
      rolesBuilder.can(user.roles).deleteOwn('proposals').granted &&
      user.userId === project.userId
    ) {
      return this.projectsService.remove(id);
    } else {
      throw new ForbiddenException("You don't own this Project");
    }
  }
}
