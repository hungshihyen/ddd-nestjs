import { UserEntity } from './user.entity';

export interface UserRepository {
  find(id: number): UserEntity;
}
