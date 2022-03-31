import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDtos } from '../../dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const costumer = await this.customerRepository.findOne({ where: { id } });
    if (!costumer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return costumer;
  }
  async create(payload: CreateCustomerDto) {
    const newCostumer = this.customerRepository.create(payload);
    return this.customerRepository.save(newCostumer);
  }

  async update(id: number, payload: UpdateCustomerDtos) {
    const costumer = await this.customerRepository.findOne({ where: { id } });
    if (!costumer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    const customerUpdate = this.customerRepository.merge(costumer, payload);
    return await this.customerRepository.save(customerUpdate);
  }
  async delete(id: number) {
    const costumer = await this.customerRepository.findOne({ where: { id } });
    if (!costumer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return await this.customerRepository.delete(id);
  }
}
