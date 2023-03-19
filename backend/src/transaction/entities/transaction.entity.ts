import { ObjectType, Field, Int } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import { Currency } from 'src/currency/entities/currency.entity';
import { Nft } from 'src/nft/entities/nft.entity';

@ObjectType()
export class Transaction {
  @Field(() => String, { description: 'Transaction Hash' })
  hash: String;

  @Field(() => Int, { description: 'Chain ID' })
  chain_id: number;

  @Field(() => String, { description: 'Related Wallet Address' })
  related_wallet_address: String;

  @Field(() => Int, { description: 'Type' })
  type: number;

  @Field(() => JSON, { description: 'Contract Settings' })
  contract_settings: any;

  @Field(() => Currency, { description: 'Currency', nullable: true })
  currency: Currency;

  @Field(() => [Nft], { description: 'NFTs', nullable: true })
  nfts: Nft[];
}
