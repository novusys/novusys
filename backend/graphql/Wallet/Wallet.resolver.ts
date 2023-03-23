import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WalletService } from './Wallet.service';
import { Wallet } from './entities/Wallet.entity';
import { CreateWalletInput } from './dto/create-Wallet.input';
import { UpdateWalletInput } from './dto/update-Wallet.input';
import { Count } from 'graphql/Count';

@Resolver(() => Wallet)
export class WalletResolver {
  constructor(private readonly WalletService: WalletService) {}

  @Mutation(() => Count)
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
  async findOne(@Args('id') id: number): Promise<Wallet> {
    return await this.WalletService.findOne(id);
  }

  @Mutation(() => Count)
  async updateWallet(@Args('id') id: number, dto: UpdateWalletInput): Promise<Count> {
    return await this.WalletService.update(id, dto);
  }

  @Mutation(() => Count)
  async removeWallet(@Args('id') id: number): Promise<Count> {
    return await this.WalletService.remove(id);
  }
}
