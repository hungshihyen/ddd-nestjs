import { Module, Provider } from '@nestjs/common';
import { CatRepositoryImpl } from './cat.repository';
import { CatController } from './cat.controller';
import { CAT_REPOSITORY, CatService } from './cat.service';

const repositories: Provider[] = [
  { provide: CAT_REPOSITORY, useClass: CatRepositoryImpl },
];

@Module({
  imports: [],
  controllers: [CatController],
  providers: [...repositories, CatService],
})
export class CatModule {}
