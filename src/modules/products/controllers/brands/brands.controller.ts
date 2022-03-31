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
import { BrandsService } from '../../services/brands/brands.service';
import { CreateBrandDtos, UpdateBrandDtos } from '../../dtos/brand.dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get('')
  async get(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return {
      data: await this.brandsService.findAll(),
      limit,
      offset,
    };
  }

  @Get(':id')
  async getBrandDetails(@Param('id', ParseIntPipe) id: number) {
    const details = await this.brandsService.findOne(id);
    return {
      data: details,
      message: 'Brand detail',
    };
  }

  @Post()
  async create(@Body() payload: CreateBrandDtos) {
    const categoryNew = await this.brandsService.create(payload);
    return {
      message: 'Brand Create',
      categoryNew,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDtos,
  ) {
    const BrandUpdate = await this.brandsService.update(id, payload);
    return {
      message: 'Brand update',
      BrandUpdate,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.brandsService.delete(id);
    return {
      message: 'Brand delete',
    };
  }
}
