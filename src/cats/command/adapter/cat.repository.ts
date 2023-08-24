import { Cat } from '../service/cat.entity';
import { Injectable } from '@nestjs/common';
import { CatRepository } from '../service/cat.repository';
import * as console from 'console';

@Injectable()
export class CatRepositoryImpl implements CatRepository {
  create(cat: Cat): void {
    console.log('CatRepositoryImpl.create', cat);
  }

  update(id: string, cat: Cat): void {
    console.log('CatRepositoryImpl.update', id, cat);
  }
}
