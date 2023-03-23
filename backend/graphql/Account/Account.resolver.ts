import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountService } from './Account.service';
import { Account } from './entities/Account.entity';
import { CreateAccountInput } from './dto/create-Account.input';
import { UpdateAccountInput } from './dto/update-Account.input';
import { Count } from 'graphql/Count';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly AccountService: AccountService) {}

  @Mutation(() => Count)
  async createAccount(
    @Args('data')
    data: CreateAccountInput,
  ) {
    return await this.AccountService.create(data);
  }

  @Query(() => [Account], { name: 'Accounts' })
  async findAll() {
    return await this.AccountService.findAll({});
  }

  @Query(() => Account, { name: 'Account' })
  async findOne(@Args('data') id: number): Promise<Account> {
    return await this.AccountService.findOne(id);
  }

  @Mutation(() => Count)
  async updateAccount(@Args('data') id: number, dto: UpdateAccountInput): Promise<Count> {
    return await this.AccountService.update(id, dto);
  }

  @Mutation(() => Count)
  async removeAccount(@Args('data') id: number): Promise<Count> {
    return await this.AccountService.remove(id);
  }
}
