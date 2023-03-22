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
export class UpdateTransactionInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly id!: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly hash!: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly chain_id!: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly type!: number;

  @Field(() => Json)
  @IsJson()
  readonly contract_settings!: json;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly currency_id!: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly currency_count!: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly wallet_id!: number;
}
