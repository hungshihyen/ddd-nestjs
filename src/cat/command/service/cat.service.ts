import { Inject, Injectable } from '@nestjs/common';
import { Cat } from './cat.entity';
import { CatRepository } from './cat.repository';
import { CreateCatDto } from '../adapter/create-cat.dto';

export const CAT_REPOSITORY = 'CAT_REPOSITORY';

@Injectable()
export class CatService {
  constructor(
    @Inject(CAT_REPOSITORY) private readonly catRepository: CatRepository,
  ) {}

  create(cat: CreateCatDto) {
    this.catRepository.create(CreateCatDto.toEntity(cat));
  }

  update(id: string, cat: Cat): void {
    this.catRepository.update(id, cat);
  }
}
