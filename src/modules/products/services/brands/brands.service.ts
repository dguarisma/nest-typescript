import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../../entities/brand.entity';
import { CreateBrandDtos, UpdateBrandDtos } from '../../dtos/brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  async findOne(id: number): Promise<Brand> {
    return await this.brandRepository.findOne({ where: { id } });
  }

  async create(payload: CreateBrandDtos) {
    const newBrand = this.brandRepository.create(payload);
    return await this.brandRepository.save(newBrand);
  }

  async update(id: number, payload: UpdateBrandDtos): Promise<Brand> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    const updateBrad = this.brandRepository.merge(brand, payload);
    return await this.brandRepository.save(updateBrad);
  }

  async delete(id: number) {
    const category = await this.brandRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return await await this.brandRepository.delete(id);
  }
}
