import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from 'src/app.response';
import { IPost } from '../interfaces';

export class CreatePostResponse extends SuccessResponse {
  @ApiProperty({ example: 'User registered successfully' })
  message: string;

  @ApiProperty({
    example: {
      id: 1,
      user_id: 1,
      title: 'Title for the first blog',
      content: 'Lorem Ipsum',
      comments: [],
      created_at: '2022-12-11T23:57:54.588Z',
      updated_at: '2022-12-11T23:57:54.588Z',
    },
  })
  data: IPost;
}

export class GetAllPostsResponse extends SuccessResponse {
  @ApiProperty({ example: 'Get all posts' })
  message: string;

  @ApiProperty({
    example: [
      {
        id: 1,
        user_id: 1,
        title: 'Title for the first blog',
        content: 'Lorem Ipsum',
        comments: [],
        created_at: '2022-12-11T23:57:54.588Z',
        updated_at: '2022-12-11T23:57:54.588Z',
      },
    ],
  })
  data: IPost[];
}

export class GetPostResponse extends SuccessResponse {
  @ApiProperty({ example: 'Get all posts' })
  message: string;

  @ApiProperty({
    example: {
      id: 1,
      user_id: 1,
      title: 'Title for the first blog',
      content: 'Lorem Ipsum',
      comments: [],
      created_at: '2022-12-11T23:57:54.588Z',
      updated_at: '2022-12-11T23:57:54.588Z',
    },
  })
  data: IPost[];
}

export class DeletePostResponse extends SuccessResponse {
  @ApiProperty({ example: 'Post deleted successfully' })
  message: string;
}
