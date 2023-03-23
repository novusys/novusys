import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCurrencyInput } from './dto/create-Currency.input';
import { UpdateCurrencyInput } from './dto/update-Currency.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCurrencyInput) {
    return await this.prisma.currency.createMany({
      data: {
        ...dto,
      },
    });
  }

  async findAll(filters: Prisma.CurrencyWhereInput) {
    return await this.prisma.currency.findMany({
      where: filters,
    });
  }

  async findOne(id: number) {
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

  async update(id: number, dto: UpdateCurrencyInput) {
    return await this.prisma.currency.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: number) {
    return await this.prisma.currency.deleteMany({
      where: {
        id,
      },
    });
  }
}
