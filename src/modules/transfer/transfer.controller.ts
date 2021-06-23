import { ValidationPipe } from '@nestjs/common';
import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

import { FindTransferSteps } from '~/modules/transfer/transfer.dto';
import TransferService from '~/modules/transfer/transfer.service';

@Controller('api/transfer')
export default class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get()
  @ApiOkResponse({ description: 'Suggested transitive transfer steps result' })
  @ApiBadRequestResponse({ description: 'Invalid transfer query' })
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  findTransferSteps(@Query() data: FindTransferSteps): string {
    return this.transferService.getHello();
  }
}
