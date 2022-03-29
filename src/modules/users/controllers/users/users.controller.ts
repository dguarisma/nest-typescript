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
import { UsersService } from '../../services/users/users.service';
import { CreateUserDtos, UpdateUserDtos } from '../../dtos/user.dtos';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  getAll(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return {
      data: this.usersService.findAll(),
      limit,
      offset,
    };
  }

  @Get(':id')
  getUserDetails(@Param('id', ParseIntPipe) id: number) {
    const details = this.usersService.findOne(id);
    return {
      data: details,
      message: 'User detail',
    };
  }
  @Get(':id/orders')
  getUserSale(@Param('id', ParseIntPipe) id: number) {
    const userNew = this.usersService.getOrdersByUser(id);
    return {
      ...userNew,
    };
  }

  @Post()
  create(@Body() payload: CreateUserDtos) {
    const userNew = this.usersService.create(payload);
    return {
      message: 'User Create',
      userNew,
    };
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDtos,
  ) {
    const userUpdate = this.usersService.update(id, payload);
    return {
      message: 'User update',
      userUpdate,
    };
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    const userUpdate = this.usersService.delete(id);
    return {
      message: 'User delete',
      userUpdate,
    };
  }
}
