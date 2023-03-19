import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateWalletInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
