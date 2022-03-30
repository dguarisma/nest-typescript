import { Module } from '@nestjs/common';
//controllers
import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/costumers/customers.controller';
//providers
import { ProductsModule } from '../products/products.module';
import { UsersService } from './services/users/users.service';
import { CustomersService } from './services/costumers/costumers.service';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
