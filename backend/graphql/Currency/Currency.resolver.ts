import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrencyService } from './Currency.service';
import { Currency } from './entities/Currency.entity';
import { CreateCurrencyInput } from './dto/create-Currency.input';
import { UpdateCurrencyInput } from './dto/update-Currency.input';
import { Count } from 'graphql/Count';

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private readonly CurrencyService: CurrencyService) {}

  @Mutation(() => Count)
  async createCurrency(
    @Args('data')
    data: CreateCurrencyInput,
  ) {
    return await this.CurrencyService.create(data);
  }

  @Query(() => [Currency], { name: 'Currencys' })
  async findAll() {
    return await this.CurrencyService.findAll({});
  }

  @Query(() => Currency, { name: 'Currency' })
  async findOne(@Args('data') id: number): Promise<Currency> {
    return await this.CurrencyService.findOne(id);
  }

  @Mutation(() => Count)
  async updateCurrency(@Args('data') id: number, dto: UpdateCurrencyInput): Promise<Count> {
    return await this.CurrencyService.update(id, dto);
  }

  @Mutation(() => Count)
  async removeCurrency(@Args('data') id: number): Promise<Count> {
    return await this.CurrencyService.remove(id);
  }
}
