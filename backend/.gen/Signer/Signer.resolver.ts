import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SignerService } from './Signer.service';
import { Signer } from './entities/Signer.entity';
import { CreateSignerInput } from './dto/create-Signer.input';
import { UpdateSignerInput } from './dto/update-Signer.input';
import { Count, UUIDv4Input } from '@api/shared/util-api'; //Omitting for now

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
  async findOne(@Args('data') { id }: UUIDv4Input): Promise<Signer> {
    return await this.SignerService.findOne(id);
  }

  @Mutation(() => Count)
  async updateSigner(@Args('data') dto: UpdateSignerInput): Promise<Count> {
    return await this.SignerService.update(dto.id, dto);
  }

  @Mutation(() => Count)
  async removeSigner(@Args('data') { id }: UUIDv4Input): Promise<Count> {
    return await this.SignerService.remove(id);
  }
}
