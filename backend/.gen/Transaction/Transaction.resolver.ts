import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionService } from './Transaction.service';
import { Transaction } from './entities/Transaction.entity';
import { CreateTransactionInput } from './dto/create-Transaction.input';
import { UpdateTransactionInput } from './dto/update-Transaction.input';
import { Count, UUIDv4Input } from '@api/shared/util-api'; //Omitting for now

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly TransactionService: TransactionService) {}

  @Mutation(() => Count)
  async createTransaction(
    @Args('data')
    data: CreateTransactionInput,
  ) {
    return await this.TransactionService.create(data);
  }

  @Query(() => [Transaction], { name: 'Transactions' })
  async findAll() {
    return await this.TransactionService.findAll({});
  }

  @Query(() => Transaction, { name: 'Transaction' })
  async findOne(@Args('data') { id }: UUIDv4Input): Promise<Transaction> {
    return await this.TransactionService.findOne(id);
  }

  @Mutation(() => Count)
  async updateTransaction(
    @Args('data') dto: UpdateTransactionInput,
  ): Promise<Count> {
    return await this.TransactionService.update(dto.id, dto);
  }

  @Mutation(() => Count)
  async removeTransaction(@Args('data') { id }: UUIDv4Input): Promise<Count> {
    return await this.TransactionService.remove(id);
  }
}
