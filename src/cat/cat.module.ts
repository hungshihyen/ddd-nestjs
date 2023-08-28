import { Module, Provider } from '@nestjs/common';
import { CatRepositoryImpl } from './command/adapter/cat.repository.implement';
import { CatController as GetCatController } from './query/adapter/cat.controller';
import { CatController as CreateCatController } from './command/adapter/cat.controller';
import { CatService } from './command/service/cat.service';
import { CAT_REPOSITORY } from './cat.di-tokens';

const controllers = [GetCatController, CreateCatController];

const repositories: Provider[] = [
  { provide: CAT_REPOSITORY, useClass: CatRepositoryImpl },
];

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...repositories, CatService],
})
export class CatModule {}
