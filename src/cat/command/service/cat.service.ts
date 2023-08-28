import { Inject, Injectable } from '@nestjs/common';
import { CatRepository } from './cat.repository';
import { CreateCatDto } from '../adapter/create-cat.dto';
import { UpdateCatDto } from '../adapter/cat-update-dto';
import { Cat } from '../../entity/cat.entity';
import { CAT_REPOSITORY } from '../../cat.di-tokens';

// command: "nest g service cat" to create a service

@Injectable()
export class CatService {
  constructor(@Inject(CAT_REPOSITORY) private catRepository: CatRepository) {}

  create(cat: CreateCatDto): void {
    this.catRepository.create(CreateCatDto.toEntity(cat));
  }

  update(index: number, updateCatDto: UpdateCatDto): void {
    let cat: Cat;
    try {
      cat = this.catRepository.get(index);
    } catch (e) {
      throw new Error(e);
    }
    cat.rename(updateCatDto.name);
    cat.updateAge(updateCatDto.age);
    cat.updateBreed(updateCatDto.breed);

    this.catRepository.update(index, cat);
  }

  remove(index: number) {
    this.catRepository.remove(index);
  }
}
