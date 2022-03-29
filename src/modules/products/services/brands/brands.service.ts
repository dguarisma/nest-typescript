import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../../entities/brand.entity';
import { CreateBrandDtos, UpdateBrandDtos } from '../../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  private countId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'tommy',
      image:
        'https://media.istockphoto.com/photos/tommy-hilfiger-logo-picture-id459388761?k=20&m=459388761&s=612x612&w=0&h=Wm3UzccRTxY6r4HDsFntyQmEIcsxn7X1vYt2pt1R48Y=',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand not found #${id}`);
    }
    return this.brands.find((item) => item.id === id);
  }
  create(payload: CreateBrandDtos) {
    this.countId += 1;
    const newBrand = {
      id: this.countId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }
  update(id: number, payload: UpdateBrandDtos) {
    const brand = this.findOne(id);
    if (!brand) {
      return null;
    }

    const index = this.brands.findIndex((item) => item.id === id);
    this.brands[index] = {
      id: id,
      ...brand,
      ...payload,
    };
    return this.brands[index];
  }
  delete(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brands.splice(index, 1);
    return true;
  }
}
