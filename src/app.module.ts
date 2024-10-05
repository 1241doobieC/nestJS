import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserPostModule } from './user-post/user-post.module';

@Module({
  imports: [UserModule, UserPostModule],
  providers: [AppService],
})
export class AppModule {}
