import { PrismaModule } from '@api/shared/util-prisma';
import { Module } from '@nestjs/common';
import { TransactionService } from './Transaction.service';
import { TransactionResolver } from './Transaction.resolver';
@Module({
  imports: [PrismaModule],
  providers: [TransactionResolver, TransactionService],
})
export class TransactionModule {}
