import { Cat } from '../../entity/cat.entity';

export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;

  static toEntity(createCatDto: CreateCatDto): Cat {
    return new Cat(createCatDto.name, createCatDto.age, createCatDto.breed);
  }
}
