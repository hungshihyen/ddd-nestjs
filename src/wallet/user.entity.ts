export class User {
  id: number;
  isLocked: boolean;

  constructor(id: number, isLocked: boolean) {
    this.id = id;
    this.isLocked = isLocked;
  }
}
