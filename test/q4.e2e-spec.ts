import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { usersDB } from '../src/user/user.repository.service';
import { postDB } from '../src/post/post.repository.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          exposeDefaultValues: true,
        },
      }),
    );
    await app.init();
  });

  it('/users/:id/posts (GET)', () => {
    usersDB.push({
      id: 2,
      name: 'John Doe',
      email: 'example',
    });

    postDB.push({
      id: 2,
      title: 'p1',
      content: 'c1',
      authorId: 2,
    });

    postDB.push({
      id: 3,
      title: 'p2',
      content: 'c2',
      authorId: 2,
    });

    return request(app.getHttpServer())
      .get('/users/2/posts')
      .expect(200)
      .expect({
        id: 2,
        name: 'John Doe',
        email: 'example',
        posts: [
          {
            id: 2,
            title: 'p1',
            content: 'c1',
            authorId: 2,
          },
          {
            id: 3,
            title: 'p2',
            content: 'c2',
            authorId: 2,
          },
        ],
      });
  });
});
