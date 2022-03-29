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

@Controller('orders')
export class OrdersController {
  @Get('')
  get(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `tu eres  ${limit} & tu eres ${offset} y nuestra marca es ${brand}`,
    };
  }

  @Get(':saleId')
  getDetailsSale(@Param('saleId') saleId: string) {
    return { message: `Orden ${saleId}` };
  }

  @Post()
  create(@Body() payload: object) {
    return {
      message: 'orden Creada con exito!',
      payload,
    };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: object) {
    return {
      message: 'Orden editado!',
      id,
      payload,
    };
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      message: 'Orden borrando con exito!',
      id,
    };
  }
}
