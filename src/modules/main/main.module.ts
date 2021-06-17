import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateEnvironmentVariables } from '~/helpers/environment';
import TransferModule from '~/modules/transfer/transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentVariables,
    }),
    TransferModule,
  ],
})
export default class MainModule {}
