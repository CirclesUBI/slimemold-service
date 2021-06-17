import { Controller, Get } from '@nestjs/common';

import TransferService from '~/services/transfer';

@Controller()
export default class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get()
  getHello(): string {
    return this.transferService.getHello();
  }
}
