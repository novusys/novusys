import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
