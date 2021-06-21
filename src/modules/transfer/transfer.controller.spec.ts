import { Test } from '@nestjs/testing';

import TransferController from '~/modules/transfer/transfer.controller';
import TransferService from '~/modules/transfer/transfer.service';

describe('TransferController', () => {
  let transferController: TransferController;
  let transferService: TransferService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TransferController],
      providers: [TransferService],
    }).compile();

    transferService = moduleRef.get<TransferService>(TransferService);
    transferController = moduleRef.get<TransferController>(TransferController);
  });

  describe('findTransferSteps', () => {
    it('should return result', async () => {
      jest
        .spyOn(transferService, 'getHello')
        .mockImplementation(() => 'Hello, Mock!');

      expect(
        await transferController.findTransferSteps({
          from: '',
          to: '',
          value: '',
        }),
      ).toBe('Hello, Mock!');
    });
  });
});
