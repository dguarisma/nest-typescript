import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Category name' })
  readonly name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
