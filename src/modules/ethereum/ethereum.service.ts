import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

import type { Log } from 'web3-core';
import type { Contract } from 'web3-eth-contract';
import type { Event } from '~/modules/events/events.interface';

import ConfigService from '~/modules/config/config.service';

// Helper method to find the signature of a smart contract event
function getEventSignature(contract, eventName: string) {
  const { signature } = contract._jsonInterface.find((item) => {
    return item.name === eventName && item.type === 'event';
  });
  return signature;
}

@Injectable()
export default class EthereumService {
  private web3: Web3;

  constructor(private readonly configService: ConfigService) {
    const endpoint = this.configService.get('ETHEREUM_NODE_WS');
    this.web3 = new Web3(new Web3.providers.WebsocketProvider(endpoint));
  }

  getTokenContract(address?: string): Contract {
    const TokenContract = require('circles-contracts/build/contracts/Token.json');
    return new this.web3.eth.Contract(TokenContract.abi, address);
  }

  getHubContract(address?: string): Contract {
    const HubContract = require('circles-contracts/build/contracts/Hub.json');
    return new this.web3.eth.Contract(HubContract.abi, address);
  }

  async getBlockHeight(): Promise<number> {
    return await this.web3.eth.getBlockNumber();
  }

  subscribeLogs(handleCallback: (log: Log) => void): void {
    this.web3.eth
      .subscribe('logs', {
        fromBlock: 'latest',
      })
      .on('error', (error) => {
        console.log(error);
      })
      .on('data', (log) => {
        handleCallback(log);
      });
  }

  async getPastEvents(
    contract: Contract,
    eventName: string,
    blockNumber: number,
  ): Promise<Event[]> {
    try {
      const logs = await this.web3.eth.getPastLogs({
        fromBlock: blockNumber,
        toBlock: blockNumber,
        address: contract.options.address,
      });

      const signature = getEventSignature(contract, eventName);

      return logs
        .filter((log) => {
          return log.topics.includes(signature);
        })
        .map((log) => {
          return {
            address: log.address,
            blockNumber: log.blockNumber,
            topics: log.topics,
            transactionHash: log.transactionHash,
          };
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  addressesFromTopics(topics: string[]): [string, string] {
    return [
      Web3.utils.toChecksumAddress(`0x${topics[1].slice(26)}`),
      Web3.utils.toChecksumAddress(`0x${topics[2].slice(26)}`),
    ];
  }
}
