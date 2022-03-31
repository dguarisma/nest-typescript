import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateBrandDtos {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Brand name' })
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'image name' })
  readonly image: string;
}

export class UpdateBrandDtos extends PartialType(CreateBrandDtos) {}
