import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { WalletService } from './Wallet.service';
import { WalletResolver } from './Wallet.resolver';
@Module({ imports: [PrismaModule], providers: [WalletResolver, WalletService] })
export class WalletModule {}
