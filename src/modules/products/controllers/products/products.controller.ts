import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  ///HttpStatus,
  //HttpCode,
  //Res,
  //ParseIntPipe,
} from '@nestjs/common';

//import { Response } from 'express';
import { ParseIntPipe } from '../../../../common/parse-int.pipe';
import { ProductsService } from '../../services/products/products.service';
import { CreateProductDto, UpdateProductDto } from '../../dtos/product.dtos';

@Controller('Products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('')
  get(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return {
      data: this.productsService.findAll(),
      limit,
      offset,
    };
  }

  // Agregando HttpCode y HttpStatus, personalizando el response
  // @HttpCode(HttpStatus.OK)
  @Get(':id')
  getDetailsProduct(@Param('id', ParseIntPipe) id: number) {
    const details = this.productsService.findOne(id);
    return {
      data: details,
      message: 'Product details',
    };
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    const productNew = this.productsService.create(payload);
    return {
      data: productNew,
      message: 'Product Create',
    };
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    const productUpdate = this.productsService.update(id, payload);
    return {
      message: 'Product update',
      productUpdate,
    };
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    const productUpdate = this.productsService.delete(id);
    return {
      message: 'Product delete',
      productUpdate,
    };
  }
}
