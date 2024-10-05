import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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

  it('/posts (dto title validation) (POST)', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 1,
        content: 'Post 1 content',
        authorId: '1',
      })
      .expect(400);
  });

  it('/posts (dto content validation)(POST)', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'Post 1',
        content: 1,
        authorId: 1,
      })
      .expect(400);
  });

  it('/posts (dto authorId validation)(POST)', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'Post 1',
        content: 'Post 1 content',
        authorId: 'a',
      })
      .expect(400);
  });
});
