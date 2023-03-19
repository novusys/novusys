import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';

@Injectable()
export class AccountService {
  create(createAccountInput: CreateAccountInput) {
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountInput: UpdateAccountInput) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
