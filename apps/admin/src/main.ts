import cookieParser from 'cookie-parser';
import { NestFactory, Reflector } from '@nestjs/core';
import { GlobalAuthGuard } from '@app/modules';
import { AppModule } from './app.module';

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
