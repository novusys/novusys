import { Injectable } from '@nestjs/common';
import { CreateCurrencyInformationInput } from './dto/create-currency-information.input';
import { UpdateCurrencyInformationInput } from './dto/update-currency-information.input';

@Injectable()
export class CurrencyInformationService {
  create(createCurrencyInformationInput: CreateCurrencyInformationInput) {
    return 'This action adds a new currencyInformation';
  }

  findAll() {
    return `This action returns all currencyInformation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} currencyInformation`;
  }

  update(id: number, updateCurrencyInformationInput: UpdateCurrencyInformationInput) {
    return `This action updates a #${id} currencyInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} currencyInformation`;
  }
}
