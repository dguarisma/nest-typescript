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
import { UsersService } from '../../services/users/users.service';
import { CreateUserDtos, UpdateUserDtos } from '../../dtos/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  async getAll(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return {
      data: await this.usersService.findAll(),
      limit,
      offset,
    };
  }

  @Get(':id')
  async getUserDetails(@Param('id', ParseIntPipe) id: number) {
    const details = await this.usersService.findOne(id);
    return {
      data: details,
      message: 'User detail',
    };
  }
  // @Get(':id/orders')
  // getUserSale(@Param('id', ParseIntPipe) id: number) {
  //   const userNew = this.usersService.getOrdersByUser(id);
  //   return {
  //     ...userNew,
  //   };
  // }
  @Post()
  async create(@Body() payload: CreateUserDtos) {
    const userNew = await this.usersService.create(payload);
    return {
      message: 'User Create',
      userNew,
    };
  }
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDtos,
  ) {
    const userUpdate = await this.usersService.update(id, payload);
    return {
      message: 'User update',
      userUpdate,
    };
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }
}
