import { PrismaModule } from '@api/shared/util-prisma';
import { Module } from '@nestjs/common';
import { WalletService } from './Wallet.service';
import { WalletResolver } from './Wallet.resolver';
@Module({ imports: [PrismaModule], providers: [WalletResolver, WalletService] })
export class WalletModule {}
