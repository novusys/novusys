import { Controller } from '@nestjs/common';
import { Float, Query, Resolver } from '@nestjs/graphql';


@Controller()
@Resolver()
export class AppResolver {
  @Query(() => Float)
  uptime() {
    return process.uptime();
  }
}
