import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNotEmpty, IsNumberString } from 'class-validator';

export class FindTransferSteps {
  @ApiProperty({
    description: 'Ethereum sender address of transitive transaction',
  })
  @IsNotEmpty()
  @IsEthereumAddress()
  from: string;

  @ApiProperty({
    description: 'Ethereum receiver address of transitive transaction',
  })
  @IsNotEmpty()
  @IsEthereumAddress()
  to: string;

  @ApiProperty({
    description: 'Amount of transaction in Wei',
  })
  @IsNotEmpty()
  @IsNumberString()
  value: string;
}
