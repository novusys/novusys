import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Currency as PrismaCurrency, Prisma } from '@prisma/client';

@ObjectType()
export class Currency implements PrismaCurrency {
  @Field(() => Int)
  readonly id!: number;

  @Field(() => String)
  readonly uuid!: string;

  @Field(() => String)
  readonly address!: string;

  @Field(() => Int)
  readonly currency_id!: number;

  @Field(() => Int)
  readonly count!: number;

  @Field(() => Int)
  readonly wallet_id!: number;
}
