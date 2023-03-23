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
export class UpdateCurrencyInformationInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly ticker!: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly chain_id!: number;
}
