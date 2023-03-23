import { NestFactory } from '@nestjs/core';
<<<<<<< HEAD
import { env } from 'process';
import { AppModule } from './app.module';
import { PrismaService } from './libs/utils/utils-prisma/prisma.service';
import 'dotenv/config';
=======
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
>>>>>>> main

async function bootstrap() {
  // PrismaService.setDatabaseURL(process.env.DATABASE_URL, {
  //   timeout: 10,
  //   limit: 1,
  // })
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
=======

  const config = new DocumentBuilder()
    .setTitle('novusys')
    .setDescription('novusys API')
    .setVersion('1.0')
    // .addTag('wallet')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

>>>>>>> main
  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);
  await app.listen(5001);
}
bootstrap();
