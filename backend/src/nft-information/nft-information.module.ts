import { Module } from '@nestjs/common';
import { NftInformationService } from './nft-information.service';
import { NftInformationResolver } from './nft-information.resolver';

@Module({
  providers: [NftInformationResolver, NftInformationService]
})
export class NftInformationModule {}
