import { Cat } from './cat.entity';
import { Injectable } from '@nestjs/common';

export interface CatRepository {
  create(cat: Cat): void;
}

@Injectable()
export class CatRepositoryImpl implements CatRepository {
  create(cat: Cat): void {
    console.log('CatRepositoryImpl.create', cat);
  }
}
