import { Module } from '@nestjs/common';
import { CurrencyInformationService } from './currency-information.service';
import { CurrencyInformationResolver } from './currency-information.resolver';

@Module({
  providers: [CurrencyInformationResolver, CurrencyInformationService]
})
export class CurrencyInformationModule {}
