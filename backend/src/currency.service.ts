import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { Currency } from '@prisma/client';

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  async currency(
    currencyWhereUniqueInput: Prisma.CurrencyWhereUniqueInput,
  ): Promise<Currency | null> {
    return this.prisma.currency.findUnique({
      where: currencyWhereUniqueInput,
    });
  }

  async currencys(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CurrencyWhereUniqueInput;
    where?: Prisma.CurrencyWhereInput;
    orderBy?: Prisma.CurrencyOrderByWithRelationInput;
  }): Promise<Currency[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.currency.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCurrency(data: Prisma.CurrencyCreateInput): Promise<Currency> {
    return this.prisma.currency.create({
      data,
    });
  }

  async updateCurrency(params: {
    where: Prisma.CurrencyWhereUniqueInput;
    data: Prisma.CurrencyUpdateInput;
  }): Promise<Currency> {
    const { where, data } = params;
    return this.prisma.currency.update({
      data,
      where,
    });
  }

  async deleteCurrency(where: Prisma.CurrencyWhereUniqueInput): Promise<Currency> {
    return this.prisma.currency.delete({
      where,
    });
  }
}