import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'john@nest.test' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Secret_123' })
  password: string;
}
