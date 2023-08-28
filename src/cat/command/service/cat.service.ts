import { Inject, Injectable } from '@nestjs/common';
import { CatRepository } from './cat.repository';
import { CreateCatDto } from '../adapter/create-cat.dto';
import { UpdateCatDto } from '../adapter/cat-update-dto';
import { Cat } from './cat.entity';

export const CAT_REPOSITORY = 'CAT_REPOSITORY';

// command: "nest g service cat" to create a service

@Injectable()
export class CatService {
  constructor(
    @Inject(CAT_REPOSITORY) private readonly catRepository: CatRepository,
  ) {}

  create(cat: CreateCatDto): void {
    this.catRepository.create(CreateCatDto.toEntity(cat));
  }

  update(index: number, cat: UpdateCatDto): void {
    this.catRepository.update(index, new Cat(cat.name, cat.age, cat.breed));
  }

  remove(index: number) {
    this.catRepository.remove(index);
  }
}
