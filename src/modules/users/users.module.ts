import { Module } from '@nestjs/common';
//controllers
import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/costumers/customers.controller';
import { OrdersController } from './controllers/orders/orders.controller';
//providers

import { UsersService } from './services/users/users.service';
import { OrdersService } from './services/orders/orders.service';
import { CustomersService } from './services/costumers/costumers.service';

@Module({
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UsersService, CustomersService, OrdersService],
})
export class UsersModule {}
