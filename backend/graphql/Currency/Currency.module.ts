import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CurrencyService } from './Currency.service';
import { CurrencyResolver } from './Currency.resolver';
@Module({
  imports: [PrismaModule],
  providers: [CurrencyResolver, CurrencyService],
})
export class CurrencyModule {}
