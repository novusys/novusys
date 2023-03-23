import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Transaction as PrismaTransaction, Prisma } from '@prisma/client';

@ObjectType()
export class Transaction implements PrismaTransaction {
  @Field(() => Int)
  readonly id!: number;

  @Field(() => String)
  readonly hash!: string;

  @Field(() => Int)
  readonly chain_id!: number;

  @Field(() => Int)
  readonly type!: number;

  @Field(() => String)
  readonly contract_settings!: string;

  @Field(() => Int)
  readonly currency_id!: number;

  @Field(() => Int)
  readonly currency_count!: number;

  @Field(() => Int)
  readonly wallet_id!: number;
}
