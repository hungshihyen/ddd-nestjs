import { Cat } from './cat.entity';

export interface CatRepository {
  create(cat: Cat): void;

  update(id: string, cat: Cat): void;
}
