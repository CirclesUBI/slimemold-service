import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import HandlerService from '~/modules/handler/handler.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [HandlerService],
})
export default class HandlerModule {}
