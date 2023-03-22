import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Nft as PrismaNft, Prisma } from '@prisma/client';

@ObjectType()
export class Nft implements PrismaNft {
  @Field(() => Int)
  readonly id!: number;

  @Field(() => String)
  readonly uuid!: string;

  @Field(() => String)
  readonly address!: string;

  @Field(() => Int)
  readonly nft_information_id!: number;

  @Field(() => Int)
  readonly wallet_id!: number;
}
