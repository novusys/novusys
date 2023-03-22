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
export class UpdateWalletInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly id!: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly address!: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly chain_id!: number;

  @Field(() => String)
  @IsString()
  readonly abi!: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly owner_id!: number;

  @Field(() => String)
  @IsString()
  readonly contract_settings!: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly gas_saved!: number;
}
