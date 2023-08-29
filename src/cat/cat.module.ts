import { Module, Provider } from '@nestjs/common';
import { CatRepositoryImpl } from './repository/cat.repository.implement';
import { CatController } from './controller/cat.controller';
import { CatService } from './service/cat.service';
import { CAT_REPOSITORY } from './cat.di-tokens';

const controllers = [CatController];

const repositories: Provider[] = [
  { provide: CAT_REPOSITORY, useClass: CatRepositoryImpl },
];

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...repositories, CatService],
})
export class CatModule {}
