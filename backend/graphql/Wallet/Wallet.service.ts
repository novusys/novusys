import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWalletInput } from './dto/create-Wallet.input';
import { UpdateWalletInput } from './dto/update-Wallet.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateWalletInput) {
      return await this.prisma.wallet.createMany({
      data: {
        ...dto,
      },
    });
  }

  async findAll(filters: Prisma.WalletWhereInput) {
    return await this.prisma.wallet.findMany({
      where: filters,
    });
  }

  async findOne(id: number) {
    const entity = await this.prisma.wallet.findUnique({
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

  async update(id: number, dto: UpdateWalletInput) {
    return await this.prisma.wallet.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: number) {
    return await this.prisma.wallet.deleteMany({
      where: {
        id,
      },
    });
  }
}
