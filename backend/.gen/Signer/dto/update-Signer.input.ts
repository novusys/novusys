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
export class UpdateSignerInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly id!: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  readonly signer_id!: number;
}
