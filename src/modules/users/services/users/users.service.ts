import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateUserDtos, UpdateUserDtos } from '../../dtos/user.dtos';

@Injectable()
export class UsersService {
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
}
