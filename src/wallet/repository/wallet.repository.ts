import { WalletEntity } from '../entity/entity';

export interface WalletRepository {
  get(id: number): WalletEntity;

  save(wallet: WalletEntity): void;
}
