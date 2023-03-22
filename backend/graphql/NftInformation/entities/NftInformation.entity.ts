import { ObjectType, Field, Int } from '@nestjs/graphql';
import { NftInformation as PrismaNftInformation, Prisma } from '@prisma/client';

@ObjectType()
export class NftInformation implements PrismaNftInformation {
  @Field(() => Int)
  readonly id!: number;

  @Field(() => String)
  readonly name!: string;

  @Field(() => Int)
  readonly chain_id!: number;

  @Field(() => Int)
  readonly currency_id!: number;

  @Field(() => Int)
  readonly currency_count!: number;
}
