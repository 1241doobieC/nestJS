// Please not modify this file

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryService as UserRepositoryService } from './user.repository.service';

@Injectable()
export class UserService {
  constructor(private readonly userResposiotyService: UserRepositoryService) {}

  create(createUserDto: CreateUserDto) {
    return this.userResposiotyService.create(createUserDto);
  }

  findAll() {
    return this.userResposiotyService.findAll();
  }

  findOne(id: number) {
    return this.userResposiotyService.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userResposiotyService.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userResposiotyService.remove(id);
  }
}
