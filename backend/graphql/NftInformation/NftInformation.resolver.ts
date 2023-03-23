import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NftInformationService } from './NftInformation.service';
import { NftInformation } from './entities/NftInformation.entity';
import { CreateNftInformationInput } from './dto/create-NftInformation.input';
import { UpdateNftInformationInput } from './dto/update-NftInformation.input';
import { Count } from 'graphql/Count';

@Resolver(() => NftInformation)
export class NftInformationResolver {
  constructor(private readonly NftInformationService: NftInformationService) {}

  @Mutation(() => Count)
  async createNftInformation(
    @Args('data')
    data: CreateNftInformationInput,
  ) {
    return await this.NftInformationService.create(data);
  }

  @Query(() => [NftInformation], { name: 'NftInformations' })
  async findAll() {
    return await this.NftInformationService.findAll({});
  }

  @Query(() => NftInformation, { name: 'NftInformation' })
  async findOne(@Args('data') id: number): Promise<NftInformation> {
    return await this.NftInformationService.findOne(id);
  }

  @Mutation(() => Count)
  async updateNftInformation(
    @Args('data') id: number, dto: UpdateNftInformationInput,
  ): Promise<Count> {
    return await this.NftInformationService.update(id, dto);
  }

  @Mutation(() => Count)
  async removeNftInformation(
    @Args('data') id: number,
  ): Promise<Count> {
    return await this.NftInformationService.remove(id);
  }
}
