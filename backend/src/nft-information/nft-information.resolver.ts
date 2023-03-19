import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NftInformationService } from './nft-information.service';
import { NftInformation } from './entities/nft-information.entity';
import { CreateNftInformationInput } from './dto/create-nft-information.input';
import { UpdateNftInformationInput } from './dto/update-nft-information.input';

@Resolver(() => NftInformation)
export class NftInformationResolver {
  constructor(private readonly nftInformationService: NftInformationService) {}

  @Mutation(() => NftInformation)
  createNftInformation(@Args('createNftInformationInput') createNftInformationInput: CreateNftInformationInput) {
    return this.nftInformationService.create(createNftInformationInput);
  }

  @Query(() => [NftInformation], { name: 'nftInformation' })
  findAll() {
    return this.nftInformationService.findAll();
  }

  @Query(() => NftInformation, { name: 'nftInformation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.nftInformationService.findOne(id);
  }

  @Mutation(() => NftInformation)
  updateNftInformation(@Args('updateNftInformationInput') updateNftInformationInput: UpdateNftInformationInput) {
    return this.nftInformationService.update(updateNftInformationInput.id, updateNftInformationInput);
  }

  @Mutation(() => NftInformation)
  removeNftInformation(@Args('id', { type: () => Int }) id: number) {
    return this.nftInformationService.remove(id);
  }
}
