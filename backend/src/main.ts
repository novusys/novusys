import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('novusys')
    .setDescription('novusys API')
    .setVersion('1.0')
    // .addTag('wallet')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);
  await app.listen(5001);
}
bootstrap();
