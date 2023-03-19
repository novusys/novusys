import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { WalletModule } from './wallet/wallet.module';
import { NftModule } from './nft/nft.module';
import { TransactionModule } from './transaction/transaction.module';
import { CurrencyModule } from './currency/currency.module';
import { CurrencyInformationModule } from './currency-information/currency-information.module';
import { NftInformationModule } from './nft-information/nft-information.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    AccountModule,
    WalletModule,
    NftModule,
    TransactionModule,
    CurrencyModule,
    CurrencyInformationModule,
    NftInformationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
