import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import type { Contract } from 'web3-eth-contract';
import type {
  TransferEvent,
  TrustEvent,
} from '~/modules/events/events.interface';

import ConfigService from '~/modules/config/config.service';
import EthereumService from '~/modules/ethereum/ethereum.service';

@Injectable()
export default class EventsService {
  // @TODO: Get this value from database instead
  private localBlockHeight: number;
  private remoteBlockHeight: number;

  private hubContract: Contract;
  private tokenContract: Contract;

  constructor(
    private eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
    private readonly ethereumService: EthereumService,
  ) {
    const hubAddress = this.configService.get('HUB_ADDRESS');
    this.hubContract = this.ethereumService.getHubContract(hubAddress);
    this.tokenContract = this.ethereumService.getTokenContract();

    // @TODO: Set this initial block value from database instead
    this.localBlockHeight = 0;
    this.scan();
  }

  private async subscribeBlockHeight() {
    this.ethereumService.subscribeLogs((data) => {
      console.log(`Update remote block height: ${data.blockNumber}`);
      this.remoteBlockHeight = data.blockNumber;
    });
  }

  // Scan the blockchain from `startBlock` until the latest block for all
  // interesting Circles events like transfers and trust connection changes.
  //
  // This method automatically starts looking in past blocks and incrementally
  // moves on to the latest ones (aka chain "head").
  private async scan() {
    try {
      this.remoteBlockHeight = await this.ethereumService.getBlockHeight();
      console.log(`Establish at block height ${this.remoteBlockHeight}`);
      this.subscribeBlockHeight();
    } catch (error) {
      throw new Error(`Could not determine remote blockHeight: ${error}`);
    }

    this.scanNext();
  }

  private async scanNext() {
    if (this.localBlockHeight === this.remoteBlockHeight) {
      console.log(`Skip .. wait .. ${this.localBlockHeight}`);
      setTimeout(() => {
        this.scanNext();
      }, 5000);
      return;
    }

    try {
      await this.scanBlock(this.localBlockHeight);
      this.localBlockHeight += 1;
      this.scanNext();
    } catch (error) {
      console.log(error);
      // @TODO: Handle error here
    }
  }

  private async scanBlock(blockNumber: number) {
    console.log(`SCAN BLOCK ${blockNumber}`);

    const trustEvents = await this.ethereumService.getPastEvents(
      this.hubContract,
      'Trust',
      blockNumber,
    );

    for (const trustEvent of trustEvents) {
      const [truster, tokenOwner] = this.ethereumService.addressesFromTopics(
        trustEvent.topics,
      );

      const event: TrustEvent = {
        truster,
        tokenOwner,
        ...trustEvent,
      };

      this.eventEmitter.emit('TrustEvent', event);
    }

    const transferEvents = await this.ethereumService.getPastEvents(
      this.tokenContract,
      'Transfer',
      blockNumber,
    );

    for (const transferEvent of transferEvents) {
      const [from, to] = this.ethereumService.addressesFromTopics(
        transferEvent.topics,
      );

      const event: TransferEvent = {
        from,
        to,
        token: transferEvent.address,
        ...transferEvent,
      };

      this.eventEmitter.emit('TransferEvent', event);
    }
  }
}
