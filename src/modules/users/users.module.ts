import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//controllers
import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/costumers/customers.controller';
//providers
import { ProductsModule } from '../products/products.module';
import { UsersService } from './services/users/users.service';
import { CustomersService } from './services/costumers/costumers.service';
//entities
import { User } from './entities/user.entity';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
