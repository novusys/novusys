import { Test, TestingModule } from '@nestjs/testing';
import { NftInformationResolver } from './nft-information.resolver';
import { NftInformationService } from './nft-information.service';

describe('NftInformationResolver', () => {
  let resolver: NftInformationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftInformationResolver, NftInformationService],
    }).compile();

    resolver = module.get<NftInformationResolver>(NftInformationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
