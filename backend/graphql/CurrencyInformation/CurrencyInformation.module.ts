import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CurrencyInformationService } from './CurrencyInformation.service';
import { CurrencyInformationResolver } from './CurrencyInformation.resolver';
@Module({
  imports: [PrismaModule],
  providers: [CurrencyInformationResolver, CurrencyInformationService],
})
export class CurrencyInformationModule {}
