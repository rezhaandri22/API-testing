import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreatePostResponse,
  DeletePostResponse,
  GetPostResponse,
} from './responses';
import { IUserId } from './interfaces';
import {
  ErrorValidationResponse,
  NotFoundResponse,
  SuccessResponse,
} from 'src/app.response';

@Controller('posts')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Posts')
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBody({
    description: 'success',
    type: CreatePostDto,
  })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: CreatePostResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'error: validation',
    type: ErrorValidationResponse,
  })
  create(@Req() req, @Body() createPostDto: CreatePostDto) {
    const data: CreatePostDto & IUserId = {
      ...createPostDto,
      user_id: req.user.id,
    };

    const post = this.postsService.create(data);
    return {
      success: true,
      message: 'Post created successfully',
      data: post,
    };
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CreatePostResponse,
  })
  findAll() {
    const posts = this.postsService.findAll();
    return {
      success: true,
      message: 'Get all posts',
      data: posts,
    };
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: GetPostResponse,
  })
  findOne(@Param('id') id: string, @Res() res: Response) {
    const post = this.postsService.findOne(+id);
    if (!post) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Post not found',
        data: null,
      });
    }

    return res.json({
      success: true,
      message: 'Get a post',
      data: post,
    });
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number,
    example: 1,
  })
  @ApiBody({
    description: 'success',
    type: UpdatePostDto,
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CreatePostResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'error: validation',
    type: ErrorValidationResponse,
  })
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Res() res: Response,
  ) {
    const data: UpdatePostDto = updatePostDto;

    const post = this.postsService.update(+id, data);
    if (!post) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Post not found',
        data: null,
      });
    }

    return res.json({
      success: true,
      message: 'Post updated successfully',
      data: post,
    });
  }

  @Delete('reset')
  @ApiResponse({
    status: 200,
    description: 'success',
    type: SuccessResponse,
  })
  async reset() {
    await this.postsService.reset();
    return {
      success: true,
      message: 'Reset posts successfully',
    };
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: DeletePostResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'error: validation',
    type: NotFoundResponse,
  })
  remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = this.postsService.remove(+id);
    if (!isDeleted) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Post not found',
        data: null,
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Post deleted successfully',
    });
  }
}
