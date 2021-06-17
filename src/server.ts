import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import TransferController from './controllers/transfer';
import TransferService from './services/transfer';
import { validateEnvironmentVariables } from './helpers/environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentVariables,
    }),
  ],
  controllers: [TransferController],
  providers: [TransferService],
})
export default class ServerModule {}
