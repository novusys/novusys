import { CreateNftInformationInput } from './create-nft-information.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNftInformationInput extends PartialType(CreateNftInformationInput) {
  @Field(() => Int)
  id: number;
}
