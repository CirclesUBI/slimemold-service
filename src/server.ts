import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import TransferController from '~/controllers/transfer';
import { validateEnvironmentVariables } from '~/helpers/environment';
import TransferService from '~/services/transfer';

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
