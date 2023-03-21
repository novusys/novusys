import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { NftInformation } from '@prisma/client';

@Injectable()
export class NftInformationService {
  constructor(private prisma: PrismaService) {}

  async nftInformation(
    nftInformationWhereUniqueInput: Prisma.NftInformationWhereUniqueInput,
  ): Promise<NftInformation | null> {
    return this.prisma.nftInformation.findUnique({
      where: nftInformationWhereUniqueInput,
    });
  }

  async nftInformations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NftInformationWhereUniqueInput;
    where?: Prisma.NftInformationWhereInput;
    orderBy?: Prisma.NftInformationOrderByWithRelationInput;
  }): Promise<NftInformation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.nftInformation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createNftInformation(data: Prisma.NftInformationCreateInput): Promise<NftInformation> {
    return this.prisma.nftInformation.create({
      data,
    });
  }

  async updateNftInformation(params: {
    where: Prisma.NftInformationWhereUniqueInput;
    data: Prisma.NftInformationUpdateInput;
  }): Promise<NftInformation> {
    const { where, data } = params;
    return this.prisma.nftInformation.update({
      data,
      where,
    });
  }

  async deleteNftInformation(where: Prisma.NftInformationWhereUniqueInput): Promise<NftInformation> {
    return this.prisma.nftInformation.delete({
      where,
    });
  }
}