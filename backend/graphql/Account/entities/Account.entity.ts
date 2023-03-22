import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Account as PrismaAccount, Prisma } from '@prisma/client';

@ObjectType()
export class Account implements PrismaAccount {
  @Field(() => Int)
  readonly id!: number;

  @Field(() => String)
  readonly user_id!: string;

  @Field(() => String)
  readonly address!: string;

  @Field(() => String)
  readonly user_name!: string;

  @Field(() => String)
  readonly account_type!: string;

  @Field(() => String)
  readonly avatar_url!: string;

  @Field(() => String)
  readonly account_settings!: string;

  @Field(() => String)
  readonly secondary_address!: string;

  @Field(() => [String])
  readonly activity!: string[];
}
