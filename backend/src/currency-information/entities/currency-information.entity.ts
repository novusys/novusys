import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CurrencyInformation {
  @Field(() => Int, { description: 'Currency ID' })
  id: number;

  @Field(() => String, { description: 'Name' })
  name: String;

  @Field(() => String, { description: 'Ticker' })
  ticker: String;

  @Field(() => Int, { description: 'Chain ID' })
  chain_id: number;
}
