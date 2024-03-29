import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NftService } from './Nft.service';
import { Nft } from './entities/Nft.entity';
import { CreateNftInput } from './dto/create-Nft.input';
import { UpdateNftInput } from './dto/update-Nft.input';
import { Count } from 'graphql/Count';

@Resolver(() => Nft)
export class NftResolver {
  constructor(private readonly NftService: NftService) {}

  @Mutation(() => Count)
  async createNft(
    @Args('data')
    data: CreateNftInput,
  ) {
    return await this.NftService.create(data);
  }

  @Query(() => [Nft], { name: 'Nfts' })
  async findAll() {
    return await this.NftService.findAll({});
  }

  @Query(() => Nft, { name: 'Nft' })
  async findOne(@Args('data') id: number): Promise<Nft> {
    return await this.NftService.findOne(id);
  }

  @Mutation(() => Count)
  async updateNft(@Args('data') id: number, dto: UpdateNftInput): Promise<Count> {
    return await this.NftService.update(id, dto);
  }

  @Mutation(() => Count)
  async removeNft(@Args('data') id: number): Promise<Count> {
    return await this.NftService.remove(id);
  }
}
