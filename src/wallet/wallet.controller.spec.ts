import {
  CreateUserService,
  GetBalanceService,
  SaveService,
  UserRepository,
  WalletController,
} from './wallet.controller';

describe('WalletController', () => {
  let controller: WalletController;

  beforeEach(async () => {
    const userRepository = new UserRepository();
    controller = new WalletController(
      new CreateUserService(userRepository),
      new SaveService(userRepository),
      new GetBalanceService(userRepository),
    );
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

  it('user not found', () => {
    expect(() => controller.getBalance(1)).toThrowError('USER_NOT_FOUND');
  });
});
