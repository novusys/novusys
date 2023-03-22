import { PrismaModule } from '@api/shared/util-prisma';
import { Module } from '@nestjs/common';
import { AccountService } from './Account.service';
import { AccountResolver } from './Account.resolver';
@Module({
  imports: [PrismaModule],
  providers: [AccountResolver, AccountService],
})
export class AccountModule {}
