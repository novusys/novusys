import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SignerService } from './Signer.service';
import { Signer } from './entities/Signer.entity';
import { CreateSignerInput } from './dto/create-Signer.input';
import { UpdateSignerInput } from './dto/update-Signer.input';
import { Count } from 'graphql/Count';

@Resolver(() => Signer)
export class SignerResolver {
  constructor(private readonly SignerService: SignerService) {}

  @Mutation(() => Count)
  async createSigner(
    @Args('data')
    data: CreateSignerInput,
  ) {
    return await this.SignerService.create(data);
  }

  @Query(() => [Signer], { name: 'Signers' })
  async findAll() {
    return await this.SignerService.findAll({});
  }

  @Query(() => Signer, { name: 'Signer' })
  async findOne(@Args('data') id: number): Promise<Signer> {
    return await this.SignerService.findOne(id);
  }

  @Mutation(() => Count)
  async updateSigner(@Args('data') id: number, dto: UpdateSignerInput): Promise<Count> {
    return await this.SignerService.update(id, dto);
  }

  @Mutation(() => Count)
  async removeSigner(@Args('data') id: number): Promise<Count> {
    return await this.SignerService.remove(id);
  }
}
