import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WalletService } from './Wallet.service';
import { Wallet } from './entities/Wallet.entity';
import { CreateWalletInput } from './dto/create-Wallet.input';
import { UpdateWalletInput } from './dto/update-Wallet.input';

@Resolver(() => Wallet)
export class WalletResolver {
  constructor(private readonly WalletService: WalletService) {}

  @Mutation(() => Wallet)
  async createWallet(
    @Args('data')
    data: CreateWalletInput,
  ) {
    return await this.WalletService.create(data);
  }

  @Query(() => [Wallet], { name: 'Wallets' })
  async findAll() {
    return await this.WalletService.findAll({});
  }

  @Query(() => Wallet, { name: 'Wallet' })
  async findOne(@Args('data') id: number) {
    return await this.WalletService.findOne(id);
  }

  @Mutation(() => Wallet)
  async updateWallet(@Args('data') dto: UpdateWalletInput){
    return await this.WalletService.update(dto.id, dto);
  }

  @Mutation(() => Wallet)
  async removeWallet(@Args('data') id: number) {
    return await this.WalletService.remove(id);
  }
}
