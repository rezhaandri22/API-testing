import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  ApiTags,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateCommentResponse } from './responses';
import { ErrorValidationResponse, NotFoundResponse } from 'src/app.response';
import { IUserId } from './interfaces';
import { DeleteCommentResponse } from './responses/comments.response';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Comments')
@ApiBearerAuth()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiBody({
    description: 'success',
    type: CreateCommentDto,
  })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: CreateCommentResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'error: validation',
    type: ErrorValidationResponse,
  })
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
    @Res() res: Response,
  ) {
    const data: CreateCommentDto & IUserId = {
      ...createCommentDto,
      user_id: req.user.id,
    };
    const comment = this.commentsService.create(data);

    if (!comment) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Can not create comment, post not found',
        data: null,
      });
    }

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Comment created successfully',
      data: comment,
    });
  }

  @Delete('reset')
  async reset() {
    await this.commentsService.reset();
    return {
      success: true,
      message: 'Reset comments successfully',
    };
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a comment that exists in the database',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: DeleteCommentResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'error: validation',
    type: NotFoundResponse,
  })
  remove(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = this.commentsService.remove(+id);
    if (!isDeleted) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Comment not found',
        data: null,
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  }
}
