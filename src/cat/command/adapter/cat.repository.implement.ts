import { Cat } from '../service/cat.entity';
import { Injectable } from '@nestjs/common';
import { CatRepository } from '../service/cat.repository';
import CatMapper from '../../cat.mapper';

@Injectable()
export class CatRepositoryImpl implements CatRepository {
  create(cat: Cat): void {
    CatMapper.setCat(cat);
  }

  update(index: number, cat: Cat): void {
    CatMapper.updateCat(index, cat);
  }

  remove(index: number): void {
    CatMapper.removeCat(index);
  }

  get(index: number): Cat {
    if (CatMapper.getCat()[index] === undefined) {
      throw new Error('CAT_NOT_FOUND');
    }
    return CatMapper.getCat()[index];
  }
}
