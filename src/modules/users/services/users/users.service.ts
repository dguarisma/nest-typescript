import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { User } from '../../entities/user.entity';
import { Order } from '../../entities/orders.entitys';
import { CreateUserDtos, UpdateUserDtos } from '../../dtos/user.dto';
import { ProductsService } from '../../../products/services/products/products.service';
import config from '../../../../config';

@Injectable()
export class UsersService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('API_KEY') private key,
    private productsService: ProductsService,
  ) {}
  private countId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'daviguarisma@gmail.com',
      password: '222222',
      role: 'admin',
    },
  ];

  findAll() {
    // Forma de consurmi variables el .env sin tipar y con tipado
    // console.log(this.configService.get<number>('API_KEY'));
    // console.log(this.configService.get<string>('DATABASE_NAME'));
    console.log(this.key);
    console.log(this.configService.apiKey);
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User not found #${id}`);
    }
    return this.users.find((item) => item.id === id);
  }
  create(payload: CreateUserDtos) {
    this.countId += 1;
    const newUser = {
      id: this.countId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, payload: UpdateUserDtos) {
    const user = this.findOne(id);
    if (!user) {
      return null;
    }

    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      id: id,
      ...user,
      ...payload,
    };
    return this.users[index];
  }
  delete(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
  getOrdersByUser(id: number): Order {
    const user = this.findOne(id);

    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
