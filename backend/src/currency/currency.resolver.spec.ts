import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyResolver } from './currency.resolver';
import { CurrencyService } from './currency.service';

describe('CurrencyResolver', () => {
  let resolver: CurrencyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyResolver, CurrencyService],
    }).compile();

    resolver = module.get<CurrencyResolver>(CurrencyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
