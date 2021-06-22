import { Module } from '@nestjs/common';

import ConfigModule from '~/modules/config/config.module';
import EventsModule from '~/modules/events/events.module';
import HandlerModule from '~/modules/handler/handler.module';
import TransferModule from '~/modules/transfer/transfer.module';

@Module({
  imports: [ConfigModule, EventsModule, HandlerModule, TransferModule],
})
export default class MainModule {}
