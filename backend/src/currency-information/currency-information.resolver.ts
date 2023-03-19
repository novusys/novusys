import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrencyInformationService } from './currency-information.service';
import { CurrencyInformation } from './entities/currency-information.entity';
import { CreateCurrencyInformationInput } from './dto/create-currency-information.input';
import { UpdateCurrencyInformationInput } from './dto/update-currency-information.input';

@Resolver(() => CurrencyInformation)
export class CurrencyInformationResolver {
  constructor(private readonly currencyInformationService: CurrencyInformationService) {}

  @Mutation(() => CurrencyInformation)
  createCurrencyInformation(@Args('createCurrencyInformationInput') createCurrencyInformationInput: CreateCurrencyInformationInput) {
    return this.currencyInformationService.create(createCurrencyInformationInput);
  }

  @Query(() => [CurrencyInformation], { name: 'currencyInformation' })
  findAll() {
    return this.currencyInformationService.findAll();
  }

  @Query(() => CurrencyInformation, { name: 'currencyInformation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.currencyInformationService.findOne(id);
  }

  @Mutation(() => CurrencyInformation)
  updateCurrencyInformation(@Args('updateCurrencyInformationInput') updateCurrencyInformationInput: UpdateCurrencyInformationInput) {
    return this.currencyInformationService.update(updateCurrencyInformationInput.id, updateCurrencyInformationInput);
  }

  @Mutation(() => CurrencyInformation)
  removeCurrencyInformation(@Args('id', { type: () => Int }) id: number) {
    return this.currencyInformationService.remove(id);
  }
}
