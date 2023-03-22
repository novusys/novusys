import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Wallet as PrismaWallet, Prisma } from '@prisma/client';

@ObjectType()
export class Wallet implements PrismaWallet {
  @Field(() => Int)
  readonly id!: number;

  @Field(() => String)
  readonly address!: string;

  @Field(() => Int)
  readonly chain_id!: number;

  @Field(() => String)
  readonly abi!: string;

  @Field(() => Int)
  readonly owner_id!: number;

  @Field(() => String)
  readonly contract_settings!: string;

  @Field(() => Int)
  readonly gas_saved!: number;
}
