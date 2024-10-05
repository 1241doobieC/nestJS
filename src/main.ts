import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        exposeDefaultValues: true,
      },
    }),
  );
  swaggerInit(app);
  await app.listen(3000);
}
bootstrap();

function swaggerInit(app: any) {
  const config = new DocumentBuilder()
    .setTitle('example service')
    .setDescription('The example service API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http', // this should be apiKey
        name: 'login_token', // this is the name of the key you expect in header
        in: 'header',
      },
      'login_token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // `${'api/message/v1'}/restful-api-docs`,
    '/api-docs',
    app,
    document,
  );
}
