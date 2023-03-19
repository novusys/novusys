import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';

@Module({
  providers: [AccountResolver, AccountService]
})
export class AccountModule {}
