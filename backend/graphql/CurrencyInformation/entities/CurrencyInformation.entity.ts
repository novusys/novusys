import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  CurrencyInformation as PrismaCurrencyInformation,
  Prisma,
} from '@prisma/client';

@ObjectType()
export class CurrencyInformation implements PrismaCurrencyInformation {
  @Field(() => Int)
  readonly id!: number;

  @Field(() => String)
  readonly name!: string;

  @Field(() => String)
  readonly ticker!: string;

  @Field(() => Int)
  readonly chain_id!: number;
}
