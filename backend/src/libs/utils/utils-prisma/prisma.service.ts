// import { PrismaClient } from '@prisma/client'
// import {
//   INestApplicationContext,
//   INestApplication,
//   OnModuleInit,
//   Injectable,
// } from '@nestjs/common'

// interface ConnectionPoolOpts {
//   readonly limit: number
//   readonly timeout: number
// }

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   private static url: string

//   constructor() {
    
//     if (PrismaService.url != null) {
//         console.log("TESTING",process.env['NODE_ENV'] === 'development', PrismaService.url)
//       if (process.env['NODE_ENV'] === 'development') {
//         super({
//           log: ['query', 'info', 'warn', 'error'],
//           datasources: {
//             db: {
//               url: PrismaService.url,
//             },
//           },
//         })
//       } else {
//         super({
//           datasources: {
//             db: {
//               url: PrismaService.url,
//             },
//           },
//         })
//       }
//     } else {
//       throw new Error('Database URL is not configured.')
//     }
//   }

//   static setDatabaseURL(url: string, opts: ConnectionPoolOpts) {
//     const conn = new URL(url)
//     conn.searchParams.set('connection_limit', opts.limit.toString())
//     conn.searchParams.set('pool_timeout', opts.timeout.toString())
//     PrismaService.url = conn.href
//   }

//   async onModuleInit() {
//     await this.$connect()
//   }

//   async enableShutdownHooks(app: INestApplication | INestApplicationContext) {
//     this.$on('beforeExit', async () => {
//       await app.close()
//     })
//   }
// }

import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}