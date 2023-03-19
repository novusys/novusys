import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Currency } from '../../currency/entities/currency.entity';
import { Nft } from '../../nft/entities/nft.entity';

@ObjectType()
export class NftInformation {
  @Field(() => Int, { description: 'NFT ID' })
  id: number;

  @Field(() => String, { description: 'Name' })
  name: String;

  @Field(() => String, { description: 'Ticker' })
  ticker: String;

  @Field(() => Int, { description: 'Chain ID' })
  chain_id: number;

  @Field(() => Currency, { description: 'Currency', nullable: true })
  currency: Currency;

  @Field(() => [Nft], { description: 'NFTs', nullable: true })
  nfts: Nft[];
}
