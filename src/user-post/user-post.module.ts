import { Module } from '@nestjs/common';
import { UserPostController } from './user-post.controller';
import { UserRepositoryService } from '../user/user.repository.service';
import { PostRepositoryService } from '../post/post.repository.service';

@Module({
  controllers: [UserPostController],
  providers: [UserRepositoryService, PostRepositoryService],
  exports: [PostRepositoryService],
})
export class UserPostModule {}
