import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';
import { PrismaService } from './libs/utils/utils-prisma/prisma.service';
import 'dotenv/config';

async function bootstrap() {
  // PrismaService.setDatabaseURL(process.env.DATABASE_URL, {
  //   timeout: 10,
  //   limit: 1,
  // })
  const app = await NestFactory.create(AppModule);
  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);
  await app.listen(5001);
}
bootstrap();
