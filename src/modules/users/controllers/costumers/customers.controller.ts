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
import { CustomersService } from '../../services/costumers/costumers.service';
import { CreateCustomerDto, UpdateCustomerDtos } from '../../dtos/customer.dto';

@ApiTags('Costumers')
@Controller('costumers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get('')
  get(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return {
      data: this.customerService.findAll(),
      limit,
      offset,
    };
  }

  @Get(':id')
  getCustomerDetails(@Param('id', ParseIntPipe) id: number) {
    const details = this.customerService.findOne(id);
    return {
      data: details,
      message: 'Customer detail',
    };
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    const customerNew = this.customerService.create(payload);
    return {
      message: 'Customer Create',
      customerNew,
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDtos,
  ) {
    const CustomerUpdate = this.customerService.update(id, payload);
    return {
      message: 'Customer update',
      CustomerUpdate,
    };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    const CustomerDelete = this.customerService.delete(id);
    return {
      message: 'Customer delete',
      CustomerDelete,
    };
  }
}
