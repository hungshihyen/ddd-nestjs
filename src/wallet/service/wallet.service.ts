import { Inject, Injectable } from '@nestjs/common';
import { WALLET_REPOSITORY } from '../wallet.di-tokens';
import { WalletRepository } from '../repository/wallet.repository';
import { SaveWalletRequest, WalletResponse } from '../dto/dto';
import { WalletEntity } from '../entity/entity';

@Injectable()
export class WalletService {
  constructor(
    @Inject(WALLET_REPOSITORY) private repository: WalletRepository,
  ) {}

  save(request: SaveWalletRequest) {
    this.repository.save(WalletEntity.from(request));
  }

  get(id: number): WalletResponse {
    const wallet = this.repository.get(id);
    return wallet.toResponse();
  }

  withdraw(id: number, amount: number) {
    const walletEntity = this.repository.get(id);
    if (walletEntity.balance < amount) {
      throw new Error('BALANCE_INSUFFICIENT');
    }
    walletEntity.deduct(amount);
    this.repository.save(walletEntity);
  }
}
