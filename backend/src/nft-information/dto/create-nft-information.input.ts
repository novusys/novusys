import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNftInformationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
