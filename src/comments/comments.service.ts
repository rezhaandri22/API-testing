import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IComment, IUserId } from './interfaces';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(forwardRef(() => PostsService))
    private postsService: PostsService,
  ) {}

  private comments: IComment[] = [];

  private getNewId() {
    const commentLength = this.comments.length;
    return this.comments[commentLength - 1]?.id + 1 || 1;
  }

  create(createCommentDto: CreateCommentDto & IUserId) {
    const isPostExists = this.postsService.findOne(createCommentDto.post_id);
    if (!isPostExists) {
      return false;
    }

    const comment: IComment = {
      ...createCommentDto,
      id: this.getNewId(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.comments.push(comment);
    return comment;
  }

  remove(id: number) {
    const commentIndex = this.comments.findIndex(
      (comment) => comment.id === id,
    );

    if (commentIndex === -1) {
      return false;
    }

    this.comments.splice(commentIndex, 1);
    return true;
  }

  findByPostId(postId: number) {
    return this.comments.filter((comment) => comment.post_id === postId);
  }

  removeByPostId(postId: number) {
    this.comments = this.comments.filter(
      (comment) => comment.post_id !== postId,
    );
    return true;
  }

  reset() {
    this.comments = [];
  }
}
