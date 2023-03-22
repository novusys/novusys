import { BadRequestException, Injectable } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-Account.input';
import { UpdateAccountInput } from './dto/update-Account.input';
import { PrismaService } from '@api/shared/util-prisma';
import { safeJsonParse } from '@api/shared/util-funcs';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAccountInput) {
    const templateSchema = safeJsonParse(dto.templateSchema, (err) => {
      throw new BadRequestException(err);
    });

    const abi = safeJsonParse(dto.abi, (err) => {
      throw new BadRequestException(err);
    });

    return await this.prisma.account.createMany({
      data: {
        ...dto,
        templateSchema,
        abi,
      },
      skipDuplicates: true,
    });
  }

  async findAll(filters: Prisma.AccountWhereInput) {
    return await this.prisma.account.findMany({
      where: filters,
    });
  }

  async findOne(id: string) {
    const entity = await this.prisma.account.findUnique({
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

  async update(id: string, dto: UpdateAccountInput) {
    return await this.prisma.account.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.account.deleteMany({
      where: {
        id,
      },
    });
  }
}
