import { Test, TestingModule } from '@nestjs/testing';
import { NftInformationService } from './nft-information.service';

describe('NftInformationService', () => {
  let service: NftInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftInformationService],
    }).compile();

    service = module.get<NftInformationService>(NftInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
