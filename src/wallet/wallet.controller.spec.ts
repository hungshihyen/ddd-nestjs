import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import {
  BAD_REQUEST_DATA,
  BAD_REQUEST_FORMAT,
  USER_LOCKED,
  USER_NOT_FOUND,
  USER_REPOSITORY_TOKEN,
  WALLET_REPOSITORY_TOKEN,
  WalletService,
} from './wallet.service';
import { WalletRepositoryImpl } from './wallet.repository.impl';
import { UserRepositoryImpl } from './user.repository.impl';

export class SaveMoneyDto {
  id: number;
  amount: any;

  constructor(id: number, amount: any) {
    this.id = id;
    this.amount = amount;
  }
}

export class GetWalletResponse {
  id: number;
  amount: number;

  constructor(id: number, amount: number) {
    this.id = id;
    this.amount = amount;
  }
}

describe('WalletController', () => {
  let controller: WalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        { provide: WALLET_REPOSITORY_TOKEN, useClass: WalletRepositoryImpl },
        { provide: USER_REPOSITORY_TOKEN, useClass: UserRepositoryImpl },
        WalletService,
      ],
    }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fail when bad request data', () => {
    expect(() => controller.save(new SaveMoneyDto(1, -100))).toThrow(
      new Error(BAD_REQUEST_DATA),
    );
  });

  it('should fail when bad request format', () => {
    expect(() => controller.save(new SaveMoneyDto(1, '100'))).toThrow(
      new Error(BAD_REQUEST_FORMAT),
    );
  });

  it('should fail when user not found', () => {
    expect(() => controller.save(new SaveMoneyDto(3, 100))).toThrow(
      new Error(USER_NOT_FOUND),
    );
  });

  it('should fail when user locked', () => {
    expect(() => controller.save(new SaveMoneyDto(2, 100))).toThrow(
      new Error(USER_LOCKED),
    );
  });

  it('should save money ok', () => {
    controller.save(new SaveMoneyDto(1, 100));

    expect(controller.get(1)).toEqual(new GetWalletResponse(1, 100));
  });
});
