export class CreateUserService {
  create(userId: number) {
    const user = new User(userId, 0);
    this.mapper[userId] = user;
  }
}
