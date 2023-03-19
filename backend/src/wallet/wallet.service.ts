import { Injectable } from '@nestjs/common';
import { CreateWalletInput } from './dto/create-wallet.input';
import { UpdateWalletInput } from './dto/update-wallet.input';

@Injectable()
export class WalletService {
  create(createWalletInput: CreateWalletInput) {
    return 'This action adds a new wallet';
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletInput: UpdateWalletInput) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
