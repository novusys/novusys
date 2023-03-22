import { BadRequestException, Injectable } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNftInput } from './dto/create-Nft.input';
import { UpdateNftInput } from './dto/update-Nft.input';
import { PrismaService } from '@api/shared/util-prisma';
import { safeJsonParse } from '@api/shared/util-funcs';
import { Prisma } from '@prisma/client';

@Injectable()
export class NftService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNftInput) {
    const templateSchema = safeJsonParse(dto.templateSchema, (err) => {
      throw new BadRequestException(err);
    });

    const abi = safeJsonParse(dto.abi, (err) => {
      throw new BadRequestException(err);
    });

    return await this.prisma.nft.createMany({
      data: {
        ...dto,
        templateSchema,
        abi,
      },
      skipDuplicates: true,
    });
  }

  async findAll(filters: Prisma.NftWhereInput) {
    return await this.prisma.nft.findMany({
      where: filters,
    });
  }

  async findOne(id: string) {
    const entity = await this.prisma.nft.findUnique({
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

  async update(id: string, dto: UpdateNftInput) {
    return await this.prisma.nft.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.nft.deleteMany({
      where: {
        id,
      },
    });
  }
}
