import { BadRequestException, Injectable } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSignerInput } from './dto/create-Signer.input';
import { UpdateSignerInput } from './dto/update-Signer.input';
import { PrismaService } from '@api/shared/util-prisma';
import { safeJsonParse } from '@api/shared/util-funcs';
import { Prisma } from '@prisma/client';

@Injectable()
export class SignerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSignerInput) {
    const templateSchema = safeJsonParse(dto.templateSchema, (err) => {
      throw new BadRequestException(err);
    });

    const abi = safeJsonParse(dto.abi, (err) => {
      throw new BadRequestException(err);
    });

    return await this.prisma.signer.createMany({
      data: {
        ...dto,
        templateSchema,
        abi,
      },
      skipDuplicates: true,
    });
  }

  async findAll(filters: Prisma.SignerWhereInput) {
    return await this.prisma.signer.findMany({
      where: filters,
    });
  }

  async findOne(id: string) {
    const entity = await this.prisma.signer.findUnique({
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

  async update(id: string, dto: UpdateSignerInput) {
    return await this.prisma.signer.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.signer.deleteMany({
      where: {
        id,
      },
    });
  }
}
