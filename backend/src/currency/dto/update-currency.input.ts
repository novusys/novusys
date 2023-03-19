import { CreateCurrencyInput } from './create-currency.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCurrencyInput extends PartialType(CreateCurrencyInput) {
  @Field(() => Int)
  id: number;
}
