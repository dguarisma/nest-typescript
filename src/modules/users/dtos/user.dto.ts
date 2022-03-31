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
  @ApiProperty({ description: 'The password of the user' })
  readonly password: string;

  @IsString()
  @ApiProperty({ description: 'The role of the user' })
  readonly role: string;
}

export class UpdateUserDtos extends PartialType(CreateUserDtos) {}
