import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty({ example: undefined })
  data?: any;
}

export class UnauthorizedResponse {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized' })
  message: string;
}

export class ErrorValidationResponse {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({
    example: [
      'user_id should not be empty',
      'user_id must be an integer number',
    ],
  })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
export class NotFoundResponse {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({
    example: 'Post not found',
  })
  message: string;
}
