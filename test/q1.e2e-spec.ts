import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { postDB } from './../src/post/post.repository.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();
  });

  const postData = {
    title: 'Post 1',
    content: 'Post 1 content',
    authorId: 1,
  };

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect(postDB);
  });

  it('/posts (POST)', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send(postData)
      .expect(201);
  });

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect(postDB);
  });

  it('/posts/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts/1')
      .expect(200)
      .expect(postDB[0]);
  });

  it('/posts/1 (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/posts/1')
      .send({
        title: 'Post 1 Updated',
      })
      .expect(200)
      .expect({
        id: 1,
        title: 'Post 1 Updated',
        content: 'Post 1 content',
        authorId: 1,
      });
  });

  it('/posts/1 (DELETE)', async () => {
    const res = await request(app.getHttpServer())
      .delete('/posts/1')
      .expect(200);

    expect(res.status).toBe(200);
    expect(postDB.findIndex((e) => e.id === 1)).toBe(-1);
  });
});
