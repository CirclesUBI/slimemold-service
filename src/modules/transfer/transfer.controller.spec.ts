import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';

import TransferModule from '~/modules/transfer/transfer.module';
import TransferService from '~/modules/transfer/transfer.service';

describe('TransferController', () => {
  let app: NestFastifyApplication;

  const transferService = { getHello: () => 'Hello, Mock!' };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TransferModule],
    })
      .overrideProvider(TransferService)
      .useValue(transferService)
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  describe('findTransferSteps', () => {
    it(`returns an error when request data is missing`, async () => {
      const result = await app.inject({
        method: 'GET',
        url: '/api/transfer',
      });

      expect(result.statusCode).toEqual(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
