import { CreateAccountInput } from './create-account.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {
  @Field(() => Int)
  id: number;
}
