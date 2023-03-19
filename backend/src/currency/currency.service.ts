import { Injectable } from '@nestjs/common';
import { CreateCurrencyInput } from './dto/create-currency.input';
import { UpdateCurrencyInput } from './dto/update-currency.input';

@Injectable()
export class CurrencyService {
  create(createCurrencyInput: CreateCurrencyInput) {
    return 'This action adds a new currency';
  }

  findAll() {
    return `This action returns all currency`;
  }

  findOne(id: number) {
    return `This action returns a #${id} currency`;
  }

  update(id: number, updateCurrencyInput: UpdateCurrencyInput) {
    return `This action updates a #${id} currency`;
  }

  remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}
