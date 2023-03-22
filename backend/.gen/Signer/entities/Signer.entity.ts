import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Signer as PrismaSigner, Prisma } from '@prisma/client';

@ObjectType()
export class Signer implements PrismaSigner {
  @Field(() => Int)
  readonly id!: number;

  @Field(() => Int)
  readonly signer_id!: number;
}
