import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import dotenv, { DotenvConfigOutput } from 'dotenv';

import Config from '~/modules/config/config.interface';

@Injectable()
export default class ConfigService {
  private readonly config: Config;

  constructor() {
    let envConfig;

    // Attempt loading `.env` file in project or defined variables in host
    // process
    try {
      envConfig = dotenv.config();
    } catch (error) {
      throw new Error('Could not load .env file');
    }

    // Make sure imported values are in the right format
    try {
      this.config = ConfigService.validate(envConfig.parsed);
    } catch (error) {
      throw new Error(`Missing environment variables: ${error}`);
    }
  }

  static validate(config: DotenvConfigOutput): Config {
    const validatedConfig = plainToClass(Config, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
      forbidUnknownValues: true,
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return validatedConfig;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(key: keyof Config): any {
    return this.config[key];
  }
}
