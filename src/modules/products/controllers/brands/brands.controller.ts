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
import { ParseIntPipe } from '../../../../common/parse-int.pipe';
import { BrandsService } from '../../services/brands/brands.service';
import { CreateBrandDtos, UpdateBrandDtos } from '../../dtos/brand.dtos';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get('')
  get(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return {
      data: this.brandsService.findAll(),
      limit,
      offset,
    };
  }

  @Get(':id')
  getBrandDetails(@Param('id', ParseIntPipe) id: number) {
    const details = this.brandsService.findOne(id);
    return {
      data: details,
      message: 'Brand detail',
    };
  }

  @Post()
  create(@Body() payload: CreateBrandDtos) {
    const categoryNew = this.brandsService.create(payload);
    return {
      message: 'Brand Create',
      categoryNew,
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDtos,
  ) {
    const BrandUpdate = this.brandsService.update(id, payload);
    return {
      message: 'Brand update',
      BrandUpdate,
    };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    const BrandDelete = this.brandsService.delete(id);
    return {
      message: 'Brand delete',
      BrandDelete,
    };
  }
}
