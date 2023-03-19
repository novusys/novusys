import { Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';

@Injectable()
export class TransactionService {
  create(createTransactionInput: CreateTransactionInput) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionInput: UpdateTransactionInput) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
