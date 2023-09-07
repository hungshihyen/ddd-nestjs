import { User } from './user.entity';

export interface UserRepository {
  find(id: number): User;
}

export class UserRepositoryImpl implements UserRepository {
  private store = {};

  find(id: number): User {
    return this.store[id];
  }
}

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY';
