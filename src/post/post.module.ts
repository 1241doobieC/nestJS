import { Module } from '@nestjs/common';
import { PostRepositoryService } from './post.repository.service';

@Module({
  providers: [PostRepositoryService],
  exports: [PostRepositoryService],
})
export class PostModule {}
