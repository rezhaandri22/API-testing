import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from 'src/app.response';
import { IComment } from '../interfaces';

export class CreateCommentResponse extends SuccessResponse {
  @ApiProperty({ example: 'Comment created successfully' })
  message: string;

  @ApiProperty({
    example: {
      id: 1,
      user_id: 1,
      title: 'My first blog',
      content: 'My first blog lorem ipsum',
      created_at: '2022-12-10T15:07:43.777Z',
      updated_at: '2022-12-10T15:07:43.777Z',
    },
  })
  data: IComment;
}

export class DeleteCommentResponse extends SuccessResponse {
  @ApiProperty({ example: 'Comment deleted successfully' })
  message: string;
}
