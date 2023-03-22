import { BadRequestException, Injectable } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCurrencyInformationInput } from './dto/create-CurrencyInformation.input';
import { UpdateCurrencyInformationInput } from './dto/update-CurrencyInformation.input';
import { PrismaService } from '@api/shared/util-prisma';
import { safeJsonParse } from '@api/shared/util-funcs';
import { Prisma } from '@prisma/client';

@Injectable()
export class CurrencyInformationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCurrencyInformationInput) {
    const templateSchema = safeJsonParse(dto.templateSchema, (err) => {
      throw new BadRequestException(err);
    });

    const abi = safeJsonParse(dto.abi, (err) => {
      throw new BadRequestException(err);
    });

    return await this.prisma.currencyInformation.createMany({
      data: {
        ...dto,
        templateSchema,
        abi,
      },
      skipDuplicates: true,
    });
  }

  async findAll(filters: Prisma.CurrencyInformationWhereInput) {
    return await this.prisma.currencyInformation.findMany({
      where: filters,
    });
  }

  async findOne(id: string) {
    const entity = await this.prisma.currencyInformation.findUnique({
      where: {
        id,
      },
    });

    if (entity == null) {
      throw new BadRequestException(
        'Certification template with ID "${id}" does not exist',
      );
    }

    return entity;
  }

  async update(id: string, dto: UpdateCurrencyInformationInput) {
    return await this.prisma.currencyInformation.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.currencyInformation.deleteMany({
      where: {
        id,
      },
    });
  }
}
