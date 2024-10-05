import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { usersDB } from '../src/user/user.repository.service';
import e from 'express';

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

  it('/users (GET)', () => {
    // usersDB.shift();
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'John Doe',
          email: 'johnDoe@gmial.com',
        },
      ]);
  });

  it('/users/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect(usersDB[0]);
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Jane Doe',
        email: 'JaneDoe@gmail.com',
      })
      .expect(201)
      .expect({
        id: 2,
        name: 'Jane Doe',
        email: 'JaneDoe@gmail.com',
      });
  });

  it('/users (dto validation)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 1,
        email: 'JaneDoe@gmail.com',
      })
      .expect(400);
  });

  it('/users/1 (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/users/1')
      .send({
        name: 'Jane Doe Updated',
      })
      .expect(200)
      .expect({
        ...usersDB[0],
        name: 'Jane Doe Updated',
      });
  });

  it('/users/1 (DELETE)', async () => {
    const res = await request(app.getHttpServer()).delete('/users/1');

    expect(res.status).toBe(200);
    expect(usersDB.findIndex((e) => e.id === 1)).toBe(-1);
  });
});
