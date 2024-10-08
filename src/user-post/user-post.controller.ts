import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserPost } from './entities/user-post.entity';
import { Post as Posts } from '../post/entities/post.entity';
import { PostRepositoryService } from '../post/post.repository.service';
import { UserRepositoryService } from '../user/user.repository.service';
import { CreatePostDto } from '../user/dto/create-post.dto';
/** q4 */
@Controller('')
export class UserPostController {
  constructor(
    private readonly postService: PostRepositoryService,
    private readonly userService: UserRepositoryService,
  ) {}

  @Get('users/:id/posts')
  async getUserPosts(@Param('id') id: string): Promise<UserPost> {
    const userId = parseInt(id, 10);
    const user = await this.userService.findOne(userId);
    if (!user) throw new Error('User not found.');

    let posts = await this.postService.findAll();

    posts = posts.filter((post) => post.authorId === user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      posts: posts,
    };
  }

  @Get('/posts')
  async getPosts(): Promise<any> {
    return this.postService.findAll();
  }

  @Post('/posts')
  async postPosts(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postService.create(createPostDto);
  }

  @Get('/posts/:id')
  async getPostById(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
    try {
      const post = await this.postService.realFindOne(id);
      if (!post) throw new NotFoundException();
      return post;
    } catch (error) {
      console.log('Caught Error:', error.message);
      if (error.message.includes('Network error')) {
        let attempt = 1;
        const maxAttempt = 3;

        while (attempt < maxAttempt) {
          try {
            const retry = await this.postService.realFindOne(id);
            return retry;
          } catch (err) {
            attempt++;
            if (attempt === maxAttempt) {
              return await this.postService.realFindOne(id);
            }
          }
        }
      } else if (error.message.includes('Internal error')) {
        throw new BadRequestException();
      } else if (error.message.includes('Not Found')) {
        throw new NotFoundException();
      }
    }
  }

  @Patch('/posts/:id')
  async patchPostById(
    @Param('id') id: number,
    @Body()
    data: {
      title: string;
      content?: string;
      authorId?: number;
    },
  ): Promise<Posts> {
    return this.postService.update(id, data);
  }

  @Delete('/posts/:id')
  async deletePostById(@Param('id') id: number): Promise<Posts> {
    return this.postService.remove(id);
  }
}
