import { Body, Controller, Post } from '@nestjs/common';

import { FindTransferSteps } from '~/api/transfer/validation';
import TransferService from '~/services/transfer';

@Controller('api/transfer')
export default class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  findTransferSteps(@Body() body: FindTransferSteps): string {
    return this.transferService.getHello();
  }
}
