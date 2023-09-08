import { User } from './wallet.service';

export interface UserRepository {
  find(id: number): User;
}

export class UserRepositoryImpl implements UserRepository {
  private store = {};

  find(id: number): User {
    return this.store[id];
  }
}
