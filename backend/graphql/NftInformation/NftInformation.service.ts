import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNftInformationInput } from './dto/create-NftInformation.input';
import { UpdateNftInformationInput } from './dto/update-NftInformation.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NftInformationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNftInformationInput) {
    return await this.prisma.nftInformation.createMany({
      data: {
        ...dto,
      },
    });
  }

  async findAll(filters: Prisma.NftInformationWhereInput) {
    return await this.prisma.nftInformation.findMany({
      where: filters,
    });
  }

  async findOne(id: number) {
    const entity = await this.prisma.nftInformation.findUnique({
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

  async update(id: number, dto: UpdateNftInformationInput) {
    return await this.prisma.nftInformation.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: number) {
    return await this.prisma.nftInformation.deleteMany({
      where: {
        id,
      },
    });
  }
}
