import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSignerInput } from './dto/create-Signer.input';
import { UpdateSignerInput } from './dto/update-Signer.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SignerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSignerInput) {
    return await this.prisma.signer.createMany({
      data: {
        ...dto,
      },
    });
  }

  async findAll(filters: Prisma.SignerWhereInput) {
    return await this.prisma.signer.findMany({
      where: filters,
    });
  }

  async findOne(id: number) {
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

  async update(id: number, dto: UpdateSignerInput) {
    return await this.prisma.signer.updateMany({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: number) {
    return await this.prisma.signer.deleteMany({
      where: {
        id,
      },
    });
  }
}
