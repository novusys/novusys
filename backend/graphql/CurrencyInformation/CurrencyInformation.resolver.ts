import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrencyInformationService } from './CurrencyInformation.service';
import { CurrencyInformation } from './entities/CurrencyInformation.entity';
import { CreateCurrencyInformationInput } from './dto/create-CurrencyInformation.input';
import { UpdateCurrencyInformationInput } from './dto/update-CurrencyInformation.input';
import { Count } from 'graphql/Count';

@Resolver(() => CurrencyInformation)
export class CurrencyInformationResolver {
  constructor(
    private readonly CurrencyInformationService: CurrencyInformationService,
  ) {}

  @Mutation(() => Count)
  async createCurrencyInformation(
    @Args('data')
    data: CreateCurrencyInformationInput,
  ) {
    return await this.CurrencyInformationService.create(data);
  }

  @Query(() => [CurrencyInformation], { name: 'CurrencyInformations' })
  async findAll() {
    return await this.CurrencyInformationService.findAll({});
  }

  @Query(() => CurrencyInformation, { name: 'CurrencyInformation' })
  async findOne(
    @Args('data') id: number,
  ): Promise<CurrencyInformation> {
    return await this.CurrencyInformationService.findOne(id);
  }

  @Mutation(() => Count)
  async updateCurrencyInformation(
    @Args('data') id: number, dto: UpdateCurrencyInformationInput,
  ): Promise<Count> {
    return await this.CurrencyInformationService.update(id, dto);
  }

  @Mutation(() => Count)
  async removeCurrencyInformation(
    @Args('data') id: number,
  ): Promise<Count> {
    return await this.CurrencyInformationService.remove(id);
  }
}
