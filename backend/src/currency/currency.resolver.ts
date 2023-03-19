import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrencyService } from './currency.service';
import { Currency } from './entities/currency.entity';
import { CreateCurrencyInput } from './dto/create-currency.input';
import { UpdateCurrencyInput } from './dto/update-currency.input';

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Mutation(() => Currency)
  createCurrency(@Args('createCurrencyInput') createCurrencyInput: CreateCurrencyInput) {
    return this.currencyService.create(createCurrencyInput);
  }

  @Query(() => [Currency], { name: 'currency' })
  findAll() {
    return this.currencyService.findAll();
  }

  @Query(() => Currency, { name: 'currency' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.currencyService.findOne(id);
  }

  @Mutation(() => Currency)
  updateCurrency(@Args('updateCurrencyInput') updateCurrencyInput: UpdateCurrencyInput) {
    return this.currencyService.update(updateCurrencyInput.id, updateCurrencyInput);
  }

  @Mutation(() => Currency)
  removeCurrency(@Args('id', { type: () => Int }) id: number) {
    return this.currencyService.remove(id);
  }
}
