import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import TransferController from '~/api/transfer/controller';
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
