import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCurrencyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
