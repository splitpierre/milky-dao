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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';

@ApiTags('Projects')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create new category' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'categories',
    action: 'create',
  })
  @Post()
  create(@Body() createCategoryDto: Category) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Get category by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update category by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'categories',
    action: 'update',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: Category) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete category by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AuthGuard, ACGuard)
  @UseRoles({
    resource: 'categories',
    action: 'delete',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
