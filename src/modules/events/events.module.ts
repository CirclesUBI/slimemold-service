import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import EthereumModule from '~/modules/ethereum/ethereum.module';
import EventsService from '~/modules/events/events.service';

@Module({
  imports: [ConfigModule, EthereumModule],
  providers: [EventsService],
})
export default class EventsModule {}
