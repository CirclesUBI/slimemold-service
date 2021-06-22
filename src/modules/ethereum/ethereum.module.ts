import { Module } from '@nestjs/common';

import ConfigModule from '~/modules/config/config.module';
import EthereumService from '~/modules/ethereum/ethereum.service';

@Module({
  imports: [ConfigModule],
  providers: [EthereumService],
  exports: [EthereumService],
})
export default class EthereumModule {}
