import { ValidationPipe } from '@nestjs/common';
import { Controller, Get, Query, UsePipes } from '@nestjs/common';

import { FindTransferSteps } from '~/modules/transfer/transfer.dto';
import TransferService from '~/modules/transfer/transfer.service';

@Controller('api/transfer')
export default class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get()
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  findTransferSteps(@Query() params: FindTransferSteps): string {
    return this.transferService.getHello();
  }
}
