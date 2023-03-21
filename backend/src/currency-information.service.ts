import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { CurrencyInformation } from '@prisma/client';

@Injectable()
export class CurrencyInformationService {
  constructor(private prisma: PrismaService) {}

  async currencyInformation(
    currencyInformationWhereUniqueInput: Prisma.CurrencyInformationWhereUniqueInput,
  ): Promise<CurrencyInformation | null> {
    return this.prisma.currencyInformation.findUnique({
      where: currencyInformationWhereUniqueInput,
    });
  }

  async currencyInformations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CurrencyInformationWhereUniqueInput;
    where?: Prisma.CurrencyInformationWhereInput;
    orderBy?: Prisma.CurrencyInformationOrderByWithRelationInput;
  }): Promise<CurrencyInformation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.currencyInformation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCurrencyInformation(data: Prisma.CurrencyInformationCreateInput): Promise<CurrencyInformation> {
    return this.prisma.currencyInformation.create({
      data,
    });
  }

  async updateCurrencyInformation(params: {
    where: Prisma.CurrencyInformationWhereUniqueInput;
    data: Prisma.CurrencyInformationUpdateInput;
  }): Promise<CurrencyInformation> {
    const { where, data } = params;
    return this.prisma.currencyInformation.update({
      data,
      where,
    });
  }

  async deleteCurrencyInformation(where: Prisma.CurrencyInformationWhereUniqueInput): Promise<CurrencyInformation> {
    return this.prisma.currencyInformation.delete({
      where,
    });
  }
}