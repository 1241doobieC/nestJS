// Please not modify this file

import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';

import {
  InternalError,
  NetworkError,
  TimeoutError,
  NotFoundError,
} from '../error';

export const postDB: Post[] = [
  {
    id: 1,
    title: 'Post 1',
    content: 'Post 1 content',
    authorId: 1,
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let realFindOneCount = 0;

@Injectable()
export class PostRepositoryService {
  async create(createPostDto: {
    title: string;
    content: string;
    authorId: number;
  }) {
    await delay(100);
    const data = {
      id: postDB.length + 1,
      ...createPostDto,
    };
    postDB.push(data);
    return data;
  }

  async findAll() {
    await delay(100);

    return postDB;
  }

  async findOne(id: number) {
    await delay(100);

    const post = postDB.find((user) => user.id === id);
    if (!post) {
      throw NotFoundError;
    }
    return post;
  }

  /** use for Question 3 */
  async realFindOne(id: number): Promise<Post | null> {
    realFindOneCount += 1;

    if (realFindOneCount === 1) {
      return this.findOne(id);
    } else if (realFindOneCount === 2) {
      throw NetworkError;
    } else if (realFindOneCount === 3) {
      throw TimeoutError;
    } else if (realFindOneCount === 4) {
      return this.findOne(id);
    } else if (realFindOneCount === 5) {
      throw InternalError;
    } else if (realFindOneCount === 6) {
      return null;
    } else {
      realFindOneCount = 1;
      return this.realFindOne(id);
    }
  }

  async update(
    id: number,
    updatePostDto: {
      title?: string;
      content?: string;
      authorId?: number;
    },
  ) {
    await delay(100);

    const post = postDB.find((user) => user.id === id);

    if (updatePostDto.title) {
      post.title = updatePostDto.title;
    }

    if (updatePostDto.content) {
      post.content = updatePostDto.content;
    }

    if (updatePostDto.authorId) {
      post.authorId = updatePostDto.authorId;
    }

    return post;
  }

  async remove(id: number) {
    await delay(100);

    const index = postDB.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }
    const post = postDB[index];
    postDB.splice(index, 1);
    return post;
  }
}
