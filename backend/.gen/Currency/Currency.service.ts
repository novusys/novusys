import { BadRequestException, Injectable } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCurrencyInput } from './dto/create-Currency.input';
import { UpdateCurrencyInput } from './dto/update-Currency.input';
import { PrismaService } from '@api/shared/util-prisma';
import { safeJsonParse } from '@api/shared/util-funcs';
import { Prisma } from '@prisma/client';

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCurrencyInput) {
    const templateSchema = safeJsonParse(dto.templateSchema, (err) => {
      throw new BadRequestException(err);
    });

    const abi = safeJsonParse(dto.abi, (err) => {
      throw new BadRequestException(err);
    });

    return await this.prisma.currency.createMany({
      data: {
        ...dto,
        templateSchema,
        abi,
      },
      skipDuplicates: true,
    });
  }

  async findAll(filters: Prisma.CurrencyWhereInput) {
    return await this.prisma.currency.findMany({
      where: filters,
    });
  }

  async findOne(id: string) {
    const entity = await this.prisma.currency.findUnique({
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

  async update(id: string, dto: UpdateCurrencyInput) {
    return await this.prisma.currency.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.currency.deleteMany({
      where: {
        id,
      },
    });
  }
}
