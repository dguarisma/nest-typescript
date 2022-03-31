import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ParseIntPipe } from '../../../../common/parse-int.pipe';
import { CategoriesService } from '../../services/categories/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../../dtos/category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryServices: CategoriesService) {}

  @Get('')
  async get(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return {
      data: await this.categoryServices.findAll(),
      limit,
      offset,
    };
  }

  @Get(':id')
  async getCategoryDetails(@Param('id', ParseIntPipe) id: number) {
    const details = await this.categoryServices.findOne(id);
    return {
      data: details,
      message: 'Category detail',
    };
  }

  @Post()
  async create(@Body() payload: CreateCategoryDto) {
    const categoryNew = await this.categoryServices.create(payload);
    return {
      message: 'Category Create',
      categoryNew,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    const categoryUpdate = await this.categoryServices.update(id, payload);
    return {
      message: 'Category update',
      categoryUpdate,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryServices.delete(id);
  }
}
