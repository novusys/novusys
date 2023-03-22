import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AccountModule } from 'graphql/Account/Account.module';
import { CurrencyModule } from 'graphql/Currency/Currency.module';
import { CurrencyInformationModule } from 'graphql/CurrencyInformation/CurrencyInformation.module';
import { NftModule } from 'graphql/Nft/Nft.module';
import { NftInformationModule } from 'graphql/NftInformation/NftInformation.module';
import { SignerModule } from 'graphql/Signer/Signer.module';
import { TransactionModule } from 'graphql/Transaction/Transaction.module';
import { WalletModule } from 'graphql/Wallet/Wallet.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    AccountModule,
    CurrencyModule,
    CurrencyInformationModule,
    NftModule,
    NftInformationModule,
    SignerModule,
    TransactionModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
