// __mocks__/UserRepo.ts
import { IUser } from '../../types/user.types';

class MockUserRepo {
  private data: IUser[] = [];

  async findOne(query: any): Promise<IUser | null> {
    return (
      this.data.find((user: any) => {
        return Object.keys(query).every((key) => user[key] === query[key]);
      }) || null
    );
  }

  async create(payload: IUser): Promise<IUser> {
    const user: any = { ...payload, _id: String(this.data.length + 1) };
    this.data.push(user);
    return user;
  }

  async save(user: IUser): Promise<IUser> {
    // In a real application, you might not need to save the user in the mock.
    return user;
  }

  async findAll(query: any): Promise<IUser[]> {
    // Simulate filtering based on query in a real scenario
    return this.data;
  }

  async countDocs(query: any): Promise<number> {
    // Simulate counting based on query in a real scenario
    return this.data.length;
  }
}

export default MockUserRepo;
