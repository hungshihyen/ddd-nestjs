import { Test, TestingModule } from "@nestjs/testing";
import { SaveMoneyRequest } from "./dtos";
import { BAD_REQUEST_DATA, BAD_REQUEST_FORMAT, USER_LOCKED, USER_NOT_FOUND } from "./error.code";
import { WalletController } from "./wallet.controller";
import { User, USER_REPOSITORY_TOKEN, WALLET_REPOSITORY_TOKEN, WalletService } from "./wallet.service";
import { UserRepository, UserRepositoryImpl } from "./user.repository";
import { WalletRepository } from "./wallet.reppsitory";
import { Wallet } from "./wallet.entity";
import { WalletRepositoryImpl } from "./walletRepositoryImpl";

describe('WalletController', () => {
  let controller: WalletController;
  let userRepository: UserRepository;
  let walletRepository: WalletRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        { provide: USER_REPOSITORY_TOKEN, useClass: UserRepositoryImpl },
        { provide: WALLET_REPOSITORY_TOKEN, useClass: WalletRepositoryImpl },
        WalletService,
      ],
    }).compile();

    controller = module.get<WalletController>(WalletController);
    userRepository = module.get(USER_REPOSITORY_TOKEN);
    walletRepository = module.get(WALLET_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fail when bad request data', () => {
    expect(() => controller.save(new SaveMoneyRequest(1, -100))).toThrowError(
      BAD_REQUEST_DATA,
    );
  });

  it('should fail when bad request format', () => {
    expect(() => controller.save(new SaveMoneyRequest(1, '100'))).toThrowError(
      BAD_REQUEST_FORMAT,
    );
  });

  it('should fail when user not found', () => {
    expect(() => controller.save(new SaveMoneyRequest(1, 100))).toThrowError(
      USER_NOT_FOUND,
    );
  });

  it('should fail when user locked', () => {
    jest.spyOn(userRepository"find"d').mockReturnValueOnce(new User(true));
    expect(() => controller.save(new SaveMoneyRequest(1, 100))).toThrowError(
      USER_LOCKED,
    );
  });

  function given_wallet(wallet: Wallet) {
    walletRepository.store = {
      [wallet.id]: wallet
    };
  }

  it('should save money ok', () => {
    jest.spyOn(userRepository, "find").mockReturnValueOnce(new User(false));

    given_wallet(new Wallet(1, 0));

    controller.save(new SaveMoneyRequest(1, 200));

    expect(controller.get(1)).toBe(200);
  });
});
