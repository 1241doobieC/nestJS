import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
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

  it('/posts/1 success (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts/1')
      .expect(200)
      .expect(postDB[0]);
  });

  it('/posts/1 retry times success (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts/1')
      .expect(200)
      .expect(postDB[0]);
  });

  it('/posts/1 badrequest fail (GET)', () => {
    return request(app.getHttpServer()).get('/posts/1').expect(400);
  });

  it('/posts/1 notfound fail (GET)', () => {
    return request(app.getHttpServer()).get('/posts/1').expect(404);
  });
});
