import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletResolver } from './wallet.resolver';

@Module({
  providers: [WalletResolver, WalletService]
})
export class WalletModule {}
