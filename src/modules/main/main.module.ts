import { Module } from '@nestjs/common';

import ConfigModule from '~/modules/config/config.module';
import TransferModule from '~/modules/transfer/transfer.module';

@Module({
  imports: [ConfigModule, TransferModule],
})
export default class MainModule {}
