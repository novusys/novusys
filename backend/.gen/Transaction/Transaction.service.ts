import { BadRequestException, Injectable } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-Transaction.input';
import { UpdateTransactionInput } from './dto/update-Transaction.input';
import { PrismaService } from '@api/shared/util-prisma';
import { safeJsonParse } from '@api/shared/util-funcs';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransactionInput) {
    const templateSchema = safeJsonParse(dto.templateSchema, (err) => {
      throw new BadRequestException(err);
    });

    const abi = safeJsonParse(dto.abi, (err) => {
      throw new BadRequestException(err);
    });

    return await this.prisma.transaction.createMany({
      data: {
        ...dto,
        templateSchema,
        abi,
      },
      skipDuplicates: true,
    });
  }

  async findAll(filters: Prisma.TransactionWhereInput) {
    return await this.prisma.transaction.findMany({
      where: filters,
    });
  }

  async findOne(id: string) {
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

  async update(id: string, dto: UpdateTransactionInput) {
    return await this.prisma.transaction.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.transaction.deleteMany({
      where: {
        id,
      },
    });
  }
}
