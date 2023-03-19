import { ObjectType, Field, Int } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { NftInformation } from '../../nft-information/entities/nft-information.entity';

@ObjectType()
export class Nft {
  @Field(() => String, { description: 'UUID' })
  uuid: String = uuidv4();

  @Field(() => String, { description: 'Address' })
  address: String;

  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field(() => NftInformation, { description: 'NFT Information' })
  nft_information: NftInformation;
}
