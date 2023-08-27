import { Cat } from '../service/cat.entity';
import { Injectable } from '@nestjs/common';
import { CatRepository } from '../service/cat.repository';
import * as console from 'console';
import CatMapper from '../../cat.mapper';

@Injectable()
export class CatRepositoryImpl implements CatRepository {
  create(cat: Cat): void {
    CatMapper.setCat(cat);
  }

  update(id: string, cat: Cat): void {
    console.log('CatRepositoryImpl.update', id, cat);
  }
}
