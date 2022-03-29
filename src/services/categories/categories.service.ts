import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../../dtos/category.dtos';

@Injectable()
export class CategoriesService {
  private countId = 1;

  private categories: Category[] = [
    {
      id: 1,
      name: 'Ofertas',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Category not found #${id}`);
    }
    return this.categories.find((item) => item.id === id);
  }
  create(payload: CreateCategoryDto) {
    this.countId += 1;
    const newProduct = {
      id: this.countId,
      ...payload,
    };
    this.categories.push(newProduct);
    return newProduct;
  }
  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    if (!category) {
      return null;
    }

    const index = this.categories.findIndex((item) => item.id === id);
    this.categories[index] = {
      id: id,
      ...category,
      ...payload,
    };
    return this.categories[index];
  }
  delete(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
