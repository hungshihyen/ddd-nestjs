import { Inject, Injectable } from '@nestjs/common';
import { Cat } from './cat.entity';

import { CatRepository } from './cat.repository';

export const CAT_REPOSITORY = 'CAT_REPOSITORY';

@Injectable()
export class CatService {
  constructor(
    @Inject(CAT_REPOSITORY) private readonly catRepository: CatRepository,
  ) {}

  create(cat: Cat) {
    return this.catRepository.create(cat);
  }
}
