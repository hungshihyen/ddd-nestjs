import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';

describe('WalletController', () => {
  let controller: WalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
    }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('get balance', () => {
    controller.create(1);
    expect(controller.getBalance(1)).toBe(0);
  });

  it('save 100', () => {
    controller.create(1);
    controller.save(1, 100);

    expect(controller.getBalance(1)).toBe(100);
  });

  it('save 100 twice', () => {
    controller.create(1);
    controller.save(1, 100);
    controller.save(1, 100);

    expect(controller.getBalance(1)).toBe(200);
  });

  it('different users', () => {
    controller.create(1);
    controller.create(2);

    controller.save(1, 100);
    controller.save(2, 200);

    expect(controller.getBalance(1)).toBe(100);
    expect(controller.getBalance(2)).toBe(200);
  });
});
