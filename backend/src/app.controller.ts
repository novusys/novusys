import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AccountService } from './account.service';
// import { SignerService } from './signer.service';
import { Account } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    // private readonly accountService: AccountService,
    // private readonly signerService: SignerService,
  ) {}

//   @Get('signer/:id')
//   async getSignerById(@Param('id') id: string): Promise<Signer> {
//     return this.signerService.signer({ id: Number(id) });
//   }

//   // @Get('feed')
//   // async getPublishedSigners(): Promise<Signer[]> {
//   //   return this.signerService.signers({
//   //     where: { published: true },
//   //   });
//   // }

//   // @Get('filtered-signers/:searchString')
//   // async getFilteredSigners(
//   //   @Param('searchString') searchString: string,
//   // ): Promise<Signer[]> {
//   //   return this.signerService.signers({
//   //     where: {
//   //       OR: [
//   //         {
//   //           title: { contains: searchString },
//   //         },
//   //         {
//   //           content: { contains: searchString },
//   //         },
//   //       ],
//   //     },
//   //   });
//   // }

//   @Post('signer')
//   async createSigner(
//     @Body() signerData: { title: string; content?: string; authorEmail: string },
//   ): Promise<Signer> {
//     const { title, content, authorEmail } = signerData;
//     return this.signerService.createSigner({
//       title,
//       content,
//       author: {
//         connect: { email: authorEmail },
//       },
//     });
//   }

  // @Post('account')
  // async createAccount(
  //   @Body() accountData: {
  //     user_id: string
  //     address: string
  //     user_name: string
  //     account_type: string
  //     avatar_url: string
  //     secondary_address: string
  //   },
  // ): Promise<Account> {
  //   return this.accountService.createAccount(accountData);
  // }

//   // @Put('signer/:id')
//   // async updateSigner(@Param('id') id: string): Promise<Signer> {
//   //   return this.signerService.updateSigner({
//   //     where: { id: Number(id) },
//   //     data: { published: true },
//   //   });
//   // }

//   @Delete('account/:id')
//   async deleteAccount(@Param('id') id: string): Promise<Account> {
//     return this.accountService.deleteAccount({ id: Number(id) });
//   }

//   @Delete('signer/:id')
//   async deleteSigner(@Param('id') id: string): Promise<Signer> {
//     return this.signerService.deleteSigner({ id: Number(id) });
//   }
}