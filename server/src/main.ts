import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { checkAllowedOrigins } from './util/security-helper';

async function bootstrap() {
  const whitelist = [
    'https://milky-dao.vercel.app',
    'https://milky-dao.netlify.app/',
  ];
  let corsObj: any = false;
  if (process.env.PUBLIC_ENVIRONMENT === 'local') {
    corsObj = true;
  } else {
    corsObj = {
      origin: function (origin: any, callback: any) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (!checkAllowedOrigins(origin, whitelist)) {
          const msg =
            'The CORS policy for this site does not ' +
            'allow access from the specified Origin. Origin: ' +
            origin;
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    };
  }

  const app = await NestFactory.create(AppModule, {
    cors: corsObj,
  });
  // app.enableCors();
  // app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Milky DAO API')
    .setDescription('API for interacting with Milky DAO platform')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log('bootstrap server envs', process.env.PORT);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
