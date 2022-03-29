import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../../entities/customer.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDtos,
} from '../../dtos/customer.dtos';

@Injectable()
export class CustomersService {
  private countId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Carlos',
      lastName: 'Perez',
      phone: '+41 122222222',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const costumer = this.customers.find((item) => item.id === id);
    if (!costumer) {
      throw new NotFoundException(`Costumer not found #${id}`);
    }
    return this.customers.find((item) => item.id === id);
  }
  create(payload: CreateCustomerDto) {
    this.countId += 1;
    const newCostumer = {
      id: this.countId,
      ...payload,
    };
    this.customers.push(newCostumer);
    return newCostumer;
  }
  update(id: number, payload: UpdateCustomerDtos) {
    const costumer = this.findOne(id);
    if (!costumer) {
      return null;
    }

    const index = this.customers.findIndex((item) => item.id === id);
    this.customers[index] = {
      id: id,
      ...costumer,
      ...payload,
    };
    return this.customers[index];
  }
  delete(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Costumer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  }
}
