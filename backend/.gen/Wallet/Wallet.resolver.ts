import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WalletService } from './Wallet.service';
import { Wallet } from './entities/Wallet.entity';
import { CreateWalletInput } from './dto/create-Wallet.input';
import { UpdateWalletInput } from './dto/update-Wallet.input';
import { Count, UUIDv4Input } from '@api/shared/util-api'; //Omitting for now

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
  async findOne(@Args('data') { id }: UUIDv4Input): Promise<Wallet> {
    return await this.WalletService.findOne(id);
  }

  @Mutation(() => Count)
  async updateWallet(@Args('data') dto: UpdateWalletInput): Promise<Count> {
    return await this.WalletService.update(dto.id, dto);
  }

  @Mutation(() => Count)
  async removeWallet(@Args('data') { id }: UUIDv4Input): Promise<Count> {
    return await this.WalletService.remove(id);
  }
}
