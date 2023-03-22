import { BadRequestException, Injectable } from '@nestjs/common';
import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  MaxLength,
  IsString,
  IsEmail,
  Matches,
  IsUUID,
  IsJSON,
  IsInt,
  IsUrl,
  IsBoolean,
} from 'class-validator';
@InputType()
export class CreateAccountInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly user_id!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly address!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly user_name!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly account_type!: string;

  @Field(() => String)
  @IsString()
  readonly avatar_url!: string;

  @Field(() => String)
  @IsString()
  readonly account_settings!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly secondary_address!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly activity!: string;
}
