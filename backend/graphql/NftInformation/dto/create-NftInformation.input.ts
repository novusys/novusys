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
export class CreateNftInformationInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly chain_id!: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly currency_id!: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly currency_count!: number;
}
