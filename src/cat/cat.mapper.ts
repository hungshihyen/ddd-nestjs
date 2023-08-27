import { Cat } from './command/service/cat.entity';

let instance: CatMapper;

class CatMapper {
  cat: Cat[] = [];

  setCat(cat: Cat): void {
    this.cat.push(cat);
  }

  getCat(): Cat[] {
    return this.cat;
  }
}

export default (() => {
  if (instance) {
    return instance;
  }

  instance = new CatMapper();
  return instance;
})();
