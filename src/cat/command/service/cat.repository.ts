import { Cat } from './cat.entity';

export interface CatRepository {
  create(cat: Cat): void;

  update(index: number, cat: Cat): void;
}
