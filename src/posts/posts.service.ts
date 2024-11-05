import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CommentsService } from 'src/comments/comments.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

// interfaces
import { IPost, IUserId } from './interfaces';

@Injectable()
export class PostsService {
  constructor(
    @Inject(forwardRef(() => CommentsService))
    private commentService: CommentsService,
  ) {}

  private posts: IPost[] = [];

  private getNewId() {
    const postLength = this.posts.length;
    return this.posts[postLength - 1]?.id + 1 || 1;
  }

  create(createPostDto: CreatePostDto & IUserId) {
    const data: IPost = {
      ...createPostDto,
      id: this.getNewId(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.posts.push(data);
    return this.findOne(data.id);
  }

  findAll() {
    return this.posts.map((comment) => ({
      ...comment,
      comments: this.commentService.findByPostId(comment.id),
    }));
  }

  findOne(id: number) {
    const comment = this.posts.find((post) => post.id === id);
    if (!comment) {
      return false;
    }
    comment.comments = this.commentService.findByPostId(comment.id);
    return comment;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      return null;
    }

    const { content, title } = updatePostDto;
    post.content = content;
    post.title = title;
    post.updated_at = new Date();

    return post;
  }

  remove(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      return false;
    }

    this.posts.splice(postIndex, 1);
    this.commentService.removeByPostId(id);
    return true;
  }

  reset() {
    this.posts = [];
  }
}
