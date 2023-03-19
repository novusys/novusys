import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyResolver } from './currency.resolver';

@Module({
  providers: [CurrencyResolver, CurrencyService]
})
export class CurrencyModule {}
