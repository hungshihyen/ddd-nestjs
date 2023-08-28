export class Cat {
  constructor(name: string, age: number, breed: string) {
    this._name = name;
    this._age = age;
    this._breed = breed;
  }

  private _age: number;

  get age(): number {
    return this._age;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  private _breed: string;

  get breed(): string {
    return this._breed;
  }

  rename(name: string) {
    this._name = name;
  }

  updateAge(age: number) {
    this._age = age;
  }

  updateBreed(breed: string) {
    this._breed = breed;
  }
}
