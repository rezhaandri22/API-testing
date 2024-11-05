import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export default class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'john@nest.test' })
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty({ example: 'Secret_123' })
  password: string;
}
