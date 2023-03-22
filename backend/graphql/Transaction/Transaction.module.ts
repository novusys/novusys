import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { TransactionService } from './Transaction.service';
import { TransactionResolver } from './Transaction.resolver';
@Module({
  imports: [PrismaModule],
  providers: [TransactionResolver, TransactionService],
})
export class TransactionModule {}
