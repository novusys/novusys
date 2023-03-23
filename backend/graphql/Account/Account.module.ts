import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AccountService } from './Account.service';
import { AccountResolver } from './Account.resolver';
@Module({
  imports: [PrismaModule],
  providers: [AccountResolver, AccountService],
})
export class AccountModule {}
