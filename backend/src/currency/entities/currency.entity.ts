import { ObjectType, Field, Int } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyInformation } from '../../currency-information/entities/currency-information.entity';

@ObjectType()
export class Currency {
  @Field(() => String, { description: 'UUID' })
  uuid: String = uuidv4();

  @Field(() => String, { description: 'Address' })
  address: String;

  @Field(() => CurrencyInformation, { description: 'Chain Information' })
  currency_information: CurrencyInformation;

  @Field(() => Int, { description: 'Count' })
  count: number;
}
