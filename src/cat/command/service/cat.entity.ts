export class Cat {
  name: string;
  age: number;
  breed: string;

  constructor(name: string, age: number, breed: string) {
    this.name = name;
    this.age = age;
    this.breed = breed;
  }

  rename(name: string) {
    this.name = name;
  }

  updateAge(age: number) {
    this.age = age;
  }

  updateBreed(breed: string) {
    this.breed = breed;
  }
}
