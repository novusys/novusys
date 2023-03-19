import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => Account)
  createAccount(@Args('createAccountInput') createAccountInput: CreateAccountInput) {
    return this.accountService.create(createAccountInput);
  }

  @Query(() => [Account], { name: 'account' })
  findAll() {
    return this.accountService.findAll();
  }

  @Query(() => Account, { name: 'account' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.accountService.findOne(id);
  }

  @Mutation(() => Account)
  updateAccount(@Args('updateAccountInput') updateAccountInput: UpdateAccountInput) {
    return this.accountService.update(updateAccountInput.id, updateAccountInput);
  }

  @Mutation(() => Account)
  removeAccount(@Args('id', { type: () => Int }) id: number) {
    return this.accountService.remove(id);
  }
}
