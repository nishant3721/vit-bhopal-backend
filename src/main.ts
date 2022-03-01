import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './modules/auth/auth.service';

const PUBLIC_URLs = ['/api/auth/signup', '/api/auth/login'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.use(checkToken);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
  console.log('Server started on: ', process.env.PORT);
}
bootstrap();

const checkToken = (req, res, next) => {
  // if url is public then pass
  const isPublic = PUBLIC_URLs.find((url) => req.path.startsWith(url));
  if (isPublic) {
    next();
  } else {
    const token = req.headers.token;
    try {
      const user = new AuthService(null).validateUser(token);
      // set the user in request
      req.user = user;
      next();
    } catch (error) {
      console.log('User not logged in: ', req.path);
      return res.status(401).json({ error: 'user not authenticated.' });
    }
  }
};
