import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entities/user.entity';
//import { Order } from '../../entities/orders.entitys';
import { CreateUserDtos, UpdateUserDtos } from '../../dtos/user.dto';
//import { ProductsService } from '../../../products/services/products/products.service';
//import config from '../../../../config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {} // @Inject('PG') private clientPg: Client, // private productsService: ProductsService, // @Inject('API_KEY') private key, // @Inject(config.KEY) private configService: ConfigType<typeof config>,

  async findAll(): Promise<User[]> {
    // Forma de consurmi variables el .env sin tipar y con tipado
    // console.log(this.configService.get<number>('API_KEY'));
    // console.log(this.configService.get<string>('DATABASE_NAME'));
    // return new Promise((resolve, reject) => {
    //   this.clientPg.query('SELECT * FROM tasks', (err, res) => {
    //     if (err) {
    //       reject(err);
    //     }
    //     resolve(res.rows);
    //   });
    // });

    /*   console.log(this.key); */
    /* console.log(this.configService.apiKey); */
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(payload: CreateUserDtos) {
    const newUser = this.userRepository.create(payload);
    return await this.userRepository.save(newUser);
  }

  async update(id: number, payload: UpdateUserDtos) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    const updateUser = this.userRepository.merge(user, payload);
    return await this.userRepository.save(updateUser);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return await this.userRepository.delete(id);
  }
  // getOrdersByUser(id: number): Order {
  //   const user = this.findOne(id);
  //   return {
  //     date: new Date(),
  //     user,
  //     // products: this.productsService.findAll(),
  //   };
  // }
}
