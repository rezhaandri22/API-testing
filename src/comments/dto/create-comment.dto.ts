import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  post_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Have a good day!' })
  content: string;
}
