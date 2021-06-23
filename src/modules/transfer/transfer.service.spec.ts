import { Test } from '@nestjs/testing';

import TransferService from '~/modules/transfer/transfer.service';

describe('TransferService', () => {
  let transferService: TransferService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TransferService],
    }).compile();

    transferService = moduleRef.get<TransferService>(TransferService);
  });

  describe('getHello', () => {
    it('should return result', async () => {
      expect(await transferService.getHello()).toBe('Hello, World!');
    });
  });
});
