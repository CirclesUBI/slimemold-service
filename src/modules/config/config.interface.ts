import { IsEnum, IsEthereumAddress, IsNumber, IsUrl } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export default class Config {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsUrl({
    protocols: ['ws', 'wss'],
    require_protocol: true,
    require_tld: false,
  })
  ETHEREUM_NODE_WS: string;

  @IsEthereumAddress()
  HUB_ADDRESS: string;

  @IsNumber()
  START_BLOCK: number;
}
