import { Module } from '@nestjs/common';

import ConfigService from '~/modules/config/config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export default class ConfigModule {}
