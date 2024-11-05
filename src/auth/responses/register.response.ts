import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from 'src/app.response';
import { IUser } from '../interfaces';

export class RegisterSuccessResponse extends SuccessResponse {
  @ApiProperty({ example: 'User registered successfully' })
  message: string;

  @ApiProperty({
    example: {
      id: 1,
      name: 'John Doe',
      email: 'john@nest.test',
      role: 'member',
      created_at: '2022-12-11T23:57:54.588Z',
      updated_at: '2022-12-11T23:57:54.588Z',
    },
  })
  data: IUser;
}

export class RegisterEmailExistsResponse {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 'Email already exists' })
  message: string;
}
