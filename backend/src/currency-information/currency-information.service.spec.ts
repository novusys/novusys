import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyInformationService } from './currency-information.service';

describe('CurrencyInformationService', () => {
  let service: CurrencyInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyInformationService],
    }).compile();

    service = module.get<CurrencyInformationService>(CurrencyInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
