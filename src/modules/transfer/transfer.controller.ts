import { Controller, Get, Param } from '@nestjs/common';

import { FindTransferSteps } from '~/modules/transfer/transfer.dto';
import TransferService from '~/modules/transfer/transfer.service';

@Controller('api/transfer')
export default class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get()
  findTransferSteps(@Param() params: FindTransferSteps): string {
    return this.transferService.getHello();
  }
}
