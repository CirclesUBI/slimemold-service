import { Module } from '@nestjs/common';

import TransferController from '~/api/transfer/controller';
import TransferService from '~/services/transfer';

@Module({
  imports: [],
  controllers: [TransferController],
  providers: [TransferService],
})
export default class ApiModule {}
