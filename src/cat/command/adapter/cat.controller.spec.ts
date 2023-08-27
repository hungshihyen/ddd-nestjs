import { Test } from '@nestjs/testing';
import { CatController } from './cat.controller';
import CatMapper from '../../cat.mapper';
import { CatModule } from '../../cat.module';

describe('CatController', () => {
  let controller: CatController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CatModule],
    }).compile();

    controller = module.get<CatController>(CatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should set cat successfully', () => {
    const cat = { name: 'test', age: 1, breed: 'test' };

    controller.create(cat);

    expect(CatMapper.getCat()).toEqual([cat]);
  });
});
