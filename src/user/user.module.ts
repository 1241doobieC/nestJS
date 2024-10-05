// Please not modify this file

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryService } from './user.repository.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepositoryService],
  exports: [UserService, UserRepositoryService],
})
export class UserModule {}
