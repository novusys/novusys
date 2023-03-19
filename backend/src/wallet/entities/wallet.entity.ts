import { ObjectType, Field, Int } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import { Currency } from '../../currency/entities/currency.entity';
import { Nft } from '../../nft/entities/nft.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';

@ObjectType()
export class Wallet {
  @Field(() => String, { description: 'Wallet Address (blockchain)' })
  address: String;

  @Field(() => Int, { description: 'Chain ID' })
  chain_id: number;

  @Field(() => JSON, { description: 'ABI' })
  abi: any;

  @Field(() => String, { description: 'Owner User ID' })
  owner_user_id: String;
  
  @Field(() => JSON, { description: 'Contract settings' })
  contract_settings: any;

  @Field(() => [Transaction], { description: 'Transactions', nullable: true })
  transactions: Transaction[];

  @Field(() => Int, { description: 'Gas Saved (gwei)' })
  gas_saved: number;

  @Field(() => [Currency], { description: 'Currency Holdings', nullable: true })
  currency_holdings: Currency[];

  @Field(() => [Nft], { description: 'NFT Holdings', nullable: true })
  nft_holdings: Nft[];
}
