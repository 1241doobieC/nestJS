// Please not modify this file

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export const usersDB: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johnDoe@gmial.com',
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

@Injectable()
export class UserRepositoryService {
  async create(createUserDto: CreateUserDto) {
    await delay(100);
    const data = {
      id: usersDB.length + 1,
      ...createUserDto,
    };
    usersDB.push(data);
    return data;
  }

  async findAll() {
    await delay(100);

    return usersDB;
  }

  async findOne(id: number) {
    await delay(100);

    return usersDB.find((user) => user.id === id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await delay(100);

    const user = usersDB.find((user) => user.id === id);
    if (!user) {
      return null;
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    return user;
  }

  async remove(id: number) {
    await delay(100);

    const index = usersDB.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }
    const user = usersDB[index];
    usersDB.splice(index, 1);
    console.log(usersDB);
    
    return user;
  }
}
