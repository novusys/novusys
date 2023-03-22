import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNftInput } from './dto/create-Nft.input';
import { UpdateNftInput } from './dto/update-Nft.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NftService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNftInput) {
    return await this.prisma.nft.createMany({
      data: {
        ...dto,
      },
    });
  }

  async findAll(filters: Prisma.NftWhereInput) {
    return await this.prisma.nft.findMany({
      where: filters,
    });
  }

  async findOne(id: number) {
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

  async update(id: number, dto: UpdateNftInput) {
    return await this.prisma.nft.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: number) {
    return await this.prisma.nft.deleteMany({
      where: {
        id,
      },
    });
  }
}
