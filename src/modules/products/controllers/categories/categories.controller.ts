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
  get(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return {
      data: this.categoryServices.findAll(),
      limit,
      offset,
    };
  }

  @Get(':id')
  getCategoryDetails(@Param('id', ParseIntPipe) id: number) {
    const details = this.categoryServices.findOne(id);
    return {
      data: details,
      message: 'Category detail',
    };
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    const categoryNew = this.categoryServices.create(payload);
    return {
      message: 'Category Create',
      categoryNew,
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    const categoryUpdate = this.categoryServices.update(id, payload);
    return {
      message: 'Category update',
      categoryUpdate,
    };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    const categoryDelete = this.categoryServices.delete(id);
    return {
      message: 'Category delete',
      categoryDelete,
    };
  }
}
