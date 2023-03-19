import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Wallet } from './../../wallet/entities/wallet.entity';
import JSON from 'graphql-type-json';

@ObjectType()
export class Account {
  @Field(() => String, { description: 'User ID (auth0) e.g., novusys|12345678' })
  user_id: String;

  @Field(() => String, { description: 'Account Address' })
  address: String;

  @Field(() => String, { description: 'User Name' })
  user_name: String;

  @Field(() => String, { description: 'Account Type' })
  account_type: String;

  @Field(() => String, { description: 'User Avatar Image URL' })
  avatar_url: String;

  @Field(() => JSON, { description: 'Account Settings' })
  account_settings: any;

  @Field(() => String, { description: 'Secondary Address' })
  secondary_address: String;

  @Field(() => [Wallet], { description: 'Wallets', nullable: true })
  wallets: Wallet[];

  @Field(() => [Account], { description: 'Signers', nullable: true })
  signers: Account[];

  @Field(() => [String], { description: 'Activity', nullable: true })
  activity: String[];
}
