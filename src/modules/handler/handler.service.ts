import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import type {
  TransferEvent,
  TrustEvent,
} from '~/modules/events/events.interface';

@Injectable()
export default class HandlerService {
  constructor() {
    console.log('Waiting ..');
  }

  @OnEvent('TrustEvent')
  handleTrustEvent(event: TrustEvent): void {
    console.log(event);
  }

  @OnEvent('TransferEvent')
  handleTransferEvent(event: TransferEvent): void {
    console.log(event);
  }
}
