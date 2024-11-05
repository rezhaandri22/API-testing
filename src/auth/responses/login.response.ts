import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from 'src/app.response';

export class LoginSuccessResponse extends SuccessResponse {
  @ApiProperty({ example: 'User registered successfully' })
  message: string;

  @ApiProperty({
    example: {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIzQG5lc3QudGVzdCIsImlkIjoxLCJpYXQiOjE2NzA4MDM0NDUsImV4cCI6MTY3MDgwMzUwNX0.832JwXZ06mTexrUgFoqS9ebHg0h-qvwik3ZVXSuQfto',
    },
  })
  data: {
    access_token: string;
  };
}
