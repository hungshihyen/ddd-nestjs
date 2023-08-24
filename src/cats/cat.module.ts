import { Module, Provider } from '@nestjs/common';
import { CatRepositoryImpl } from './command/adapter/cat.repository';
import { CatController as GetCatController } from './query/adapter/cat.controller';
import { CatController as CreateCatController } from './command/adapter/create.cat.controller';
import { CAT_REPOSITORY, CatService } from './command/service/cat.service';

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
