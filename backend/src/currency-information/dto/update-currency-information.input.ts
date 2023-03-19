import { CreateCurrencyInformationInput } from './create-currency-information.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCurrencyInformationInput extends PartialType(CreateCurrencyInformationInput) {
  @Field(() => Int)
  id: number;
}
