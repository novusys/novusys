import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-Transaction.input';
import { UpdateTransactionInput } from './dto/update-Transaction.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransactionInput) {
    return await this.prisma.transaction.createMany({
      data: {
        ...dto,
      },
    });
  }

  async findAll(filters: Prisma.TransactionWhereInput) {
    return await this.prisma.transaction.findMany({
      where: filters,
    });
  }

  async findOne(id: number) {
    const entity = await this.prisma.transaction.findUnique({
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

  async update(id: number, dto: UpdateTransactionInput) {
    return await this.prisma.transaction.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: number) {
    return await this.prisma.transaction.deleteMany({
      where: {
        id,
      },
    });
  }
}
