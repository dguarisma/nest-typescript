import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/costumers/customers.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { BrandsService } from './services/brands/brands.service';
import { UsersService } from './services/users/users.service';
import { CategoriesService } from './services/categories/categories.service';
import { OrdersService } from './services/orders/orders.service';
import { CustomersService } from './services/costumers/costumers.service';
import { ProductsService } from './services/products/products.service';

@Module({
  imports: [],
  controllers: [
    CategoriesController,
    ProductsController,
    BrandsController,
    UsersController,
    CustomersController,
    OrdersController,
  ],
  providers: [
    ProductsService,
    BrandsService,
    UsersService,
    CategoriesService,
    OrdersService,
    CustomersService,
  ],
})
export class AppModule {}
