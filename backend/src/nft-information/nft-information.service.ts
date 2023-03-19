import { Injectable } from '@nestjs/common';
import { CreateNftInformationInput } from './dto/create-nft-information.input';
import { UpdateNftInformationInput } from './dto/update-nft-information.input';

@Injectable()
export class NftInformationService {
  create(createNftInformationInput: CreateNftInformationInput) {
    return 'This action adds a new nftInformation';
  }

  findAll() {
    return `This action returns all nftInformation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nftInformation`;
  }

  update(id: number, updateNftInformationInput: UpdateNftInformationInput) {
    return `This action updates a #${id} nftInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} nftInformation`;
  }
}
