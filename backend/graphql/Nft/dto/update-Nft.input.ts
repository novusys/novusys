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
export class UpdateNftInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly uuid!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly address!: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly nft_information_id!: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly wallet_id!: number;
}
