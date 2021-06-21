import { Module } from '@nestjs/common';

import TransferController from '~/modules/transfer/transfer.controller';
import TransferService from '~/modules/transfer/transfer.service';

@Module({
  imports: [],
  controllers: [TransferController],
  providers: [TransferService],
})
export default class TransferModule {}
