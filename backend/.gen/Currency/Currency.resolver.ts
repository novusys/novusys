import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrencyService } from './Currency.service';
import { Currency } from './entities/Currency.entity';
import { CreateCurrencyInput } from './dto/create-Currency.input';
import { UpdateCurrencyInput } from './dto/update-Currency.input';
import { Count, UUIDv4Input } from '@api/shared/util-api'; //Omitting for now

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
  async findOne(@Args('data') { id }: UUIDv4Input): Promise<Currency> {
    return await this.CurrencyService.findOne(id);
  }

  @Mutation(() => Count)
  async updateCurrency(@Args('data') dto: UpdateCurrencyInput): Promise<Count> {
    return await this.CurrencyService.update(dto.id, dto);
  }

  @Mutation(() => Count)
  async removeCurrency(@Args('data') { id }: UUIDv4Input): Promise<Count> {
    return await this.CurrencyService.remove(id);
  }
}
