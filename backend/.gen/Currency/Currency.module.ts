import { PrismaModule } from '@api/shared/util-prisma';
import { Module } from '@nestjs/common';
import { CurrencyService } from './Currency.service';
import { CurrencyResolver } from './Currency.resolver';
@Module({
  imports: [PrismaModule],
  providers: [CurrencyResolver, CurrencyService],
})
export class CurrencyModule {}
