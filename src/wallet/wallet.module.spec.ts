import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './controller/wallet.controller';
import { WalletModule } from './wallet.module';
import WalletMapper from './wallet.mapper';

describe('WalletController', () => {
  let controller: WalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WalletModule],
    }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  afterEach(() => {
    WalletMapper.restore();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get successfully', () => {
    expect(controller.get(1)).toEqual({
      id: 1,
      balance: 0,
    });
  });

  it('should save successfully', () => {
    controller.save({ id: 1, balance: 1000 });

    expect(controller.get(1)).toEqual({ id: 1, balance: 1000 });
  });

  it('should withdraw successfully', () => {
    controller.save({ id: 1, balance: 1000 });

    controller.withdraw({ id: 1, amount: 500 });

    expect(controller.get(1)).toEqual({ id: 1, balance: 500 });
  });

  it('should withdraw fail when balance insufficient', () => {
    expect(() => controller.withdraw({ id: 1, amount: 500 })).toThrow(
      'BALANCE_INSUFFICIENT',
    );
  });
});
