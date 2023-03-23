import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCurrencyInformationInput } from './dto/create-CurrencyInformation.input';
import { UpdateCurrencyInformationInput } from './dto/update-CurrencyInformation.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CurrencyInformationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCurrencyInformationInput) {
    return await this.prisma.currencyInformation.createMany({
      data: {
        ...dto,
      },
    });
  }

  async findAll(filters: Prisma.CurrencyInformationWhereInput) {
    return await this.prisma.currencyInformation.findMany({
      where: filters,
    });
  }

  async findOne(id: number) {
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

  async update(id: number, dto: UpdateCurrencyInformationInput) {
    return await this.prisma.currencyInformation.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: number) {
    return await this.prisma.currencyInformation.deleteMany({
      where: {
        id,
      },
    });
  }
}
