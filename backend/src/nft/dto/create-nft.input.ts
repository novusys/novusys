import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNftInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
