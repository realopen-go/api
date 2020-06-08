import cookieParser from 'cookie-parser';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalAuthGuard } from './auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.enableCors({
    credentials: true,
    origin: function(origin, callback) {
      callback(null, true);
    },
  });

  app.useGlobalGuards(new GlobalAuthGuard(reflector));
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
