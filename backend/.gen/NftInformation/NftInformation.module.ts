import { PrismaModule } from '@api/shared/util-prisma';
import { Module } from '@nestjs/common';
import { NftInformationService } from './NftInformation.service';
import { NftInformationResolver } from './NftInformation.resolver';
@Module({
  imports: [PrismaModule],
  providers: [NftInformationResolver, NftInformationService],
})
export class NftInformationModule {}
