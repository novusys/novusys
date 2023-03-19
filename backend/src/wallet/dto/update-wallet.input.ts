import { CreateWalletInput } from './create-wallet.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWalletInput extends PartialType(CreateWalletInput) {
  @Field(() => Int)
  id: number;
}
