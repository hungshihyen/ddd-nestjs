import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

export class UserRepositoryImpl implements UserRepository {
  private store = {
    1: new UserEntity(false),
    2: new UserEntity(true),
  };

  find(id: number): UserEntity {
    return this.store[id];
  }
}
