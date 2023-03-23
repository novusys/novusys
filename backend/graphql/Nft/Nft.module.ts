import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { NftService } from './Nft.service';
import { NftResolver } from './Nft.resolver';
@Module({ imports: [PrismaModule], providers: [NftResolver, NftService] })
export class NftModule {}
