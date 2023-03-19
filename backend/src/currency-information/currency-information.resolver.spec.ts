import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyInformationResolver } from './currency-information.resolver';
import { CurrencyInformationService } from './currency-information.service';

describe('CurrencyInformationResolver', () => {
  let resolver: CurrencyInformationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyInformationResolver, CurrencyInformationService],
    }).compile();

    resolver = module.get<CurrencyInformationResolver>(CurrencyInformationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
