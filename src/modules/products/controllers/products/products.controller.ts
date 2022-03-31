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
import { ProductsService } from '../../services/products/products.service';
import { CreateProductDto, UpdateProductDto } from '../../dtos/product.dto';

@ApiTags('Products')
@Controller('Products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('')
  async get(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return {
      data: await this.productsService.findAll(),
      limit,
      offset,
    };
  }
  // Agregando HttpCode y HttpStatus, personalizando el response
  // @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getDetailsProduct(@Param('id', ParseIntPipe) id: number) {
    const details = await this.productsService.findOne(id);
    return {
      data: details,
      message: 'Product details',
    };
  }

  @Post()
  async findAllcreate(@Body() payload: CreateProductDto) {
    const productNew = await this.productsService.create(payload);
    return {
      data: productNew,
      message: 'Product Create',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    const productUpdate = await this.productsService.update(id, payload);
    return {
      message: 'Product update',
      productUpdate,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.delete(id);
    return {
      message: 'Product delete',
    };
  }
}
