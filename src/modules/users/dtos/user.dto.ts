import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDtos {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsString()
  readonly role: string;
}

export class UpdateUserDtos extends PartialType(CreateUserDtos) {}
