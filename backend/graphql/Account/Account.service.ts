import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-Account.input';
import { UpdateAccountInput } from './dto/update-Account.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAccountInput) {
    return await this.prisma.account.createMany({
      data: {
        ...dto,
      },
    });
  }

  async findAll(filters: Prisma.AccountWhereInput) {
    return await this.prisma.account.findMany({
      where: filters,
    });
  }

  async findOne(id: number) {
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

  async update(id: number, dto: UpdateAccountInput) {
    return await this.prisma.account.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: number) {
    return await this.prisma.account.deleteMany({
      where: {
        id,
      },
    });
  }
}
