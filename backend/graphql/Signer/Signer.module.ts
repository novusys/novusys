import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { SignerService } from './Signer.service';
import { SignerResolver } from './Signer.resolver';
@Module({ imports: [PrismaModule], providers: [SignerResolver, SignerService] })
export class SignerModule {}
