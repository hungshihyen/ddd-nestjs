import { Test } from '@nestjs/testing';
import { CatController } from './cat.controller';
import CatMapper from '../../cat.mapper';
import { CatModule } from '../../cat.module';
import { Cat } from '../../entity/cat.entity';

describe('CatController', () => {
  let controller: CatController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CatModule],
    }).compile();

    controller = module.get<CatController>(CatController);
  });

  beforeEach(() => {
    CatMapper.restore();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should set cat successfully', () => {
    const cat = { name: 'test', age: 1, breed: 'test' };

    controller.create(cat);

    expect(CatMapper.getCat()).toEqual([cat]);
  });

  it('should update cat successfully', () => {
    const cat1 = new Cat('test1', 1, 'test');
    const cat2 = new Cat('test2', 2, 'test');
    CatMapper.setCat(cat1);
    CatMapper.setCat(cat2);

    const updatedCatDto = { name: 'test', age: 3, breed: '22' };

    controller.update(0, updatedCatDto);

    expect(CatMapper.getCat()[0]).toEqual(updatedCatDto);
  });

  it('should update cat fail when cat not found', () => {
    const updatedCatDto = { name: 'test', age: 3, breed: '22' };

    expect(() => controller.update(0, updatedCatDto)).toThrow('CAT_NOT_FOUND');
  });

  it('should delete cat successfully', () => {
    controller.create({ name: 'test1', age: 1, breed: '1' });

    controller.remove(0);

    expect(CatMapper.getCat()).toEqual([]);
  });
});
