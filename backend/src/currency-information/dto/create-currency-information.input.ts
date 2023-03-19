import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCurrencyInformationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
