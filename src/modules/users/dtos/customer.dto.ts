import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the Customer' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The lastName of the Customer' })
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The phone of the Customer' })
  readonly phone: string;
}

export class UpdateCustomerDtos extends PartialType(CreateCustomerDto) {}
