import { Cat } from '../service/cat.entity';
import { Injectable } from '@nestjs/common';
import { CatRepository } from '../service/cat.repository';

@Injectable()
export class CatRepositoryImpl implements CatRepository {
  create(cat: Cat): void {
    console.log('CatRepositoryImpl.create', cat);
  }
}
