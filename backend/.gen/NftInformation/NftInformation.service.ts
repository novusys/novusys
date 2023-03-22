import { BadRequestException, Injectable } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNftInformationInput } from './dto/create-NftInformation.input';
import { UpdateNftInformationInput } from './dto/update-NftInformation.input';
import { PrismaService } from '@api/shared/util-prisma';
import { safeJsonParse } from '@api/shared/util-funcs';
import { Prisma } from '@prisma/client';

@Injectable()
export class NftInformationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNftInformationInput) {
    const templateSchema = safeJsonParse(dto.templateSchema, (err) => {
      throw new BadRequestException(err);
    });

    const abi = safeJsonParse(dto.abi, (err) => {
      throw new BadRequestException(err);
    });

    return await this.prisma.nftInformation.createMany({
      data: {
        ...dto,
        templateSchema,
        abi,
      },
      skipDuplicates: true,
    });
  }

  async findAll(filters: Prisma.NftInformationWhereInput) {
    return await this.prisma.nftInformation.findMany({
      where: filters,
    });
  }

  async findOne(id: string) {
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

  async update(id: string, dto: UpdateNftInformationInput) {
    return await this.prisma.nftInformation.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.nftInformation.deleteMany({
      where: {
        id,
      },
    });
  }
}
