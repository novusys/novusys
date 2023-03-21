import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { Wallet } from '@prisma/client';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async wallet(
    walletWhereUniqueInput: Prisma.WalletWhereUniqueInput,
  ): Promise<Wallet | null> {
    return this.prisma.wallet.findUnique({
      where: walletWhereUniqueInput,
    });
  }

  async wallets(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WalletWhereUniqueInput;
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithRelationInput;
  }): Promise<Wallet[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.wallet.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createWallet(data: Prisma.WalletCreateInput): Promise<Wallet> {
    return this.prisma.wallet.create({
      data,
    });
  }

  async updateWallet(params: {
    where: Prisma.WalletWhereUniqueInput;
    data: Prisma.WalletUpdateInput;
  }): Promise<Wallet> {
    const { where, data } = params;
    return this.prisma.wallet.update({
      data,
      where,
    });
  }

  async deleteWallet(where: Prisma.WalletWhereUniqueInput): Promise<Wallet> {
    return this.prisma.wallet.delete({
      where,
    });
  }
}