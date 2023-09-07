import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import {
  BAD_REQUEST_DATA,
  BAD_REQUEST_FORMAT,
  USER_LOCKED,
  USER_NOT_FOUND,
} from './error.code';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
  UserRepositoryImpl,
} from './user.repository';
import { User } from './user.entity';
import {
  WALLET_REPOSITORY_TOKEN,
  WalletRepositoryImpl,
} from './wallet.repository';
import { SaveMoneyRequest } from './dtos';

describe('WalletController', () => {
  let controller: WalletController;
  let userRepository: UserRepository;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should save fail when user not found', () => {
    expect(() => controller.save(new SaveMoneyRequest(1, 1000))).toThrowError(
      USER_NOT_FOUND,
    );
  });

  it('should fail when user locked', () => {
    jest.spyOn(userRepository, 'find').mockReturnValue(new User(1, true));

    expect(() => controller.save(new SaveMoneyRequest(1, 1000))).toThrowError(
      USER_LOCKED,
    );
  });

  it('should save fail when bad request', () => {
    expect(() => controller.save(new SaveMoneyRequest(1, -1000))).toThrowError(
      BAD_REQUEST_DATA,
    );
  });

  it('should save fail when bad request format', () => {
    expect(() => controller.save(new SaveMoneyRequest(1, '1000'))).toThrowError(
      BAD_REQUEST_FORMAT,
    );
  });

  it('should save money ok', () => {
    jest.spyOn(userRepository, 'find').mockReturnValue(new User(1, false));

    controller.save(new SaveMoneyRequest(1, 200));
    controller.save(new SaveMoneyRequest(1, 200));

    expect(controller.get(1)).toEqual(400);
  });
});
